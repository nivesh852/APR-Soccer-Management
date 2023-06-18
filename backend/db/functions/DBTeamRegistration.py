import psycopg2
import configparser
from datetime import datetime


class DBTeamRegistration(object):

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def insert_team(self,
                    team_name, gender, age_group, coach_name, team_city, team_state,
                    club_name, primary_contact, division, player_names):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()
            insert_query = """ INSERT INTO public.teams (
            team_name,gender,age_group,coach_name,team_city,team_state,
            club_name,primary_contact,division,team_details_file_path)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) 
            RETURNING team_id"""
            record_to_insert = (
                team_name, gender, age_group, coach_name, team_city, team_state,
                club_name, primary_contact, division, player_names
            )
            # print(insert_query, record_to_insert)

            cursor.execute(insert_query, record_to_insert)
            inserted_team_id = cursor.fetchone()[0]
            connection.commit()
            connection.close()
            # return_msg = "User created successfully"
            return inserted_team_id
        except (Exception, psycopg2.Error) as error:
            print("Failed to insert record into users table", error)

    # def check_team_exist(self, team_name):
    #     connection = psycopg2.connect(
    #         user=self.user,
    #         password=self.password,
    #         host=self.host,
    #         port=self.port,
    #         database=self.database,
    #     )
    #     cursor = connection.cursor()
    #     select_query = "Select team_name from public.teams where team_name=%s"


