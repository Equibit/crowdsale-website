<?php

namespace PHP_REST_API\CronJobs;

class BackupDatabase {
    public function __construct() {
        $filename='database_backup_'.date('G_a_m_d_y').'.sql';

        $output=exec('mysqldump ' . _MYSQL_DB_NAME_ . ' --password=' . _MYSQL_PASSWORD_ . ' --user=' . _MYSQL_USER_NAME_ . ' --single-transaction >~/data-backups/'.$filename);

        if ($output!='') {
            print $output;
        }
    }
}