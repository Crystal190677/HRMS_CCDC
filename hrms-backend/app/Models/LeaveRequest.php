<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $fillable = [
        'user_id', 'leave_type', 'start_date', 'end_date',
        'reason', 'status', 'admin_remarks'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

