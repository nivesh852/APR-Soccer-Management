import psycopg2
import configparser
from db.functions.DBTournamentDetails import DBTournamentDetails


class DBScheduleMatches(object):

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def dict_to_list(self, dict_items, key):
        ans = []
        for x in dict_items:
            ans.append(x[key])
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

    def select_filtered_team_list(self, division, gender, age_group):
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
                                (SELECT team_id, gender, age_group, division from public.teams 
                                where division=%s and gender=%s 
                                and age_group=%s and is_active= True) t
                            """

            record_to_select = (
                division, gender, age_group
            )
            cursor.execute(select_query, record_to_select)
            teams_json = cursor.fetchall()
            connection.close()
            return teams_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)

    def select_field_type_list(self):
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
                                (SELECT * from public.grounds_fields where is_active=True) t
                            """
            cursor.execute(select_query)
            grounds_json = cursor.fetchall()
            connection.close()
            return grounds_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into teams table", error)

    def insert_match_details(self, team_1_id, team_2_id, ground_number, match_date,
                             match_time, match_age_group, match_gender, match_division, field_id=1,
                             match_stage="group"):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            dtd = DBTournamentDetails()
            tournament_details = dtd.get_tournament_details()
            tournament_id = tournament_details[0]['tournament_id']
            start_date = tournament_details[0]['tournament_start_date']

            cursor = connection.cursor()
            insert_query = """
                            INSERT INTO public.match (team_1_id, team_2_id, ground_number, match_date, match_time, 
                            tournament_id, match_age_group, match_gender, match_division,match_stage,field_id)
                            VALUES (%s,%s,%s,date %s + integer %s,%s,%s,%s,%s,%s,%s,%s) 
                            """
            record_to_insert = (
                team_1_id, team_2_id, ground_number, start_date, str(match_date), match_time,
                tournament_id, match_age_group, match_gender, match_division, match_stage, field_id
            )
            cursor.execute(insert_query, record_to_insert)
            connection.commit()
            connection.close()
            return "All matches scheduled successfully."
        except (Exception, psycopg2.Error) as error:
            print("Failed to insert record into match table", error)
            return "Already Scheduled"

    def select_all_matches(self):
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
                                (SELECT * from public.match) t
                            """
            cursor.execute(select_query)
            matches_json = cursor.fetchall()
            connection.close()
            return matches_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into matches table", error)

    def get_scheduled_match_count(self):
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
                                (SELECT COUNT(*) as count from public.match) t
                            """
            cursor.execute(select_query)
            matches_json = cursor.fetchall()
            connection.close()
            return matches_json[0][0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into tournament table", error)
