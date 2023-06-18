import psycopg2
import configparser
from datetime import datetime


class DBTournamentDetails():

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def get_tournament_details(self):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()
            select_query = """select array_agg(row_to_json(t)) from 
                                (SELECT * from public.tournament where is_active = True) t
                            """
            cursor.execute(select_query)
            tournament_json = cursor.fetchall()
            connection.close()
            return tournament_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into tournament table", error)


