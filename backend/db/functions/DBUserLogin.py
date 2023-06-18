import psycopg2
import configparser
from datetime import datetime


class DBUserLogin(object):
    """Corpus Table Utilities"""

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def select_user(self, username, password, active="True"):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()

            select_query = """
                Select array_agg(row_to_json(t)) from 
                (SELECT user_role, is_admin from public.users 
                where username=%s and password=%s and is_active = %s) t
                """
            record_to_select = (username, password, active,)
            cursor.execute(select_query, record_to_select)
            user_json = cursor.fetchall()
            connection.close()
            return user_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into users table", error)
