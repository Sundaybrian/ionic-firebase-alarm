CREATE TABLE IF NOT EXISTS alarmtable (
    alarm_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR(140),
    alarm_fbase_id VARCHAR(140),
    alarm_type VARCHAR(30),
    date_created Date
);