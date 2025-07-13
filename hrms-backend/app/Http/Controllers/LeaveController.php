<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leave;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{
    // Employee creates leave request
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $leave = Leave::create([
            'employee_id' => Auth::id(),
            'type' => $request->type,
            'from' => $request->from,
            'to' => $request->to,
            'status' => 'Pending',
        ]);

        return response()->json($leave, 201);
    }

    // HR Staff sees all leave requests
    public function index()
    {
        $leaves = Leave::with('employee')->latest()->get();
        return response()->json($leaves);
    }

    // Approve/Reject by HR
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Approved,Rejected',
        ]);

        $leave = Leave::findOrFail($id);
        $leave->status = $request->status;
        $leave->save();

        return response()->json($leave);
    }
}

