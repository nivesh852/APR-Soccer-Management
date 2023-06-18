import psycopg2
import configparser
from datetime import datetime


class DBGetTeamDetail():

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def dict_to_list(self, dict_items, dict_key):
        ans = []
        for key, value in enumerate(dict_items):
            ans.append(
                {
                    "id": key,
                    "value": value[dict_key]
                }
            )
        return ans

    def select_division_list(self):
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
                                (SELECT DISTINCT division from public.teams where is_active = True) t
                            """
            cursor.execute(select_query)
            teams_json = cursor.fetchall()
            connection.close()
            return self.dict_to_list(teams_json[0][0], "division")
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)

    def select_age_group_list(self):
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
                                (SELECT DISTINCT age_group from public.teams where is_active = True) t
                            """
            cursor.execute(select_query)
            teams_json = cursor.fetchall()
            connection.close()
            return self.dict_to_list(teams_json[0][0], "age_group")
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)

    def select_gender_list(self):
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
                                (SELECT DISTINCT gender from public.teams where is_active = True) t
                            """
            cursor.execute(select_query)
            teams_json = cursor.fetchall()
            connection.close()
            return self.dict_to_list(teams_json[0][0], "gender")
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)

    def select_team_list(self):
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
                                (SELECT team_id, team_name, gender, age_group, division, coach_name from public.teams
                                 where is_active = True) t
                            """
            cursor.execute(select_query)
            teams_json = cursor.fetchall()
            connection.close()
            return teams_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into tournament table", error)

    def select_venue_list(self):
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
                                (SELECT field_id, field_name, field_acronym from public.field where is_active = True) t
                            """
            cursor.execute(select_query)
            field_json = cursor.fetchall()
            connection.close()
            return field_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into field table", error)

    def select_match_date_list(self):
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
                                (SELECT DISTINCT match_date from public.match) t
                            """
            cursor.execute(select_query)
            match_date_json = cursor.fetchall()
            connection.close()
            print(match_date_json)
            return self.dict_to_list(match_date_json[0][0], "match_date")
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into field table", error)

    def select_club_list(self):
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
                                (SELECT DISTINCT club_name from public.teams where is_active = True) t
                            """
            cursor.execute(select_query)
            club_json = cursor.fetchall()
            connection.close()
            return self.dict_to_list(club_json[0][0], "club_name")
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)
