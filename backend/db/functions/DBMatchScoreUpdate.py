import psycopg2
import configparser
from datetime import datetime


class DBMatchScoreUpdate(object):

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def update_team_score(self, team_1_name, team_2_name, team_1_goal, team_2_goal, match_stage, winner, match_result):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()

            team_1_id = self.get_team_id(team_1_name)
            team_2_id = self.get_team_id(team_2_name)
            winner_id = self.get_team_id(winner)

            update_query = """ UPDATE public.match SET
            team_1_goal=%s, team_2_goal=%s, match_stage=%s, winner=%s, match_result=%s
            where team_1_id=%s and team_2_id=%s"""
            record_to_update = (
                team_1_goal, team_2_goal, match_stage, str(winner_id["team_id"]),
                match_result, str(team_1_id["team_id"]), str(team_2_id["team_id"])
            )
            cursor.execute(update_query, record_to_update)
            updated_count = cursor.rowcount
            connection.commit()
            if updated_count == 0:
                raise psycopg2.Error
            connection.close()
            return_msg = "Match Goals updated successfully "
            return return_msg, True
        except (Exception, psycopg2.Error) as error:
            message = "Incorrect details provided"
            print("Failed to update record into users table",message, error)
            return message, False

    def get_team_id(self, team_name):
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
                SELECT array_agg(row_to_json(t)) from 
                (Select team_id from public.teams where team_name=%s) t
            """

            cursor.execute(select_query, (team_name,))
            team_json = cursor.fetchall()
            connection.close()
            return team_json[0][0][0]

        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into team table", error)


