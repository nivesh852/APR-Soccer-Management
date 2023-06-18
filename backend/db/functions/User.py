import psycopg2
import configparser
from datetime import datetime


class User(object):
    """Corpus Table Utilities"""

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def insert_user(self, user_name, password, active='Y', groups='icaa_user'):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()
            date_timestamp = datetime.now()
            insert_query = """ INSERT INTO icaa.users (user_name, password, created_date, active, groups)
                         VALUES (%s, %s, %s, %s, %s)"""
            record_to_insert = (user_name, password, date_timestamp, active, groups)
            cursor.execute(insert_query, record_to_insert)
            connection.commit()
            connection.close()
            return_msg = "User created successfully "
            return return_msg
        except (Exception, psycopg2.Error) as error:
            print("Failed to insert record into users table", error)
