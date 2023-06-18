import psycopg2
import configparser


class DBFetchTeamList(object):

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('./db/functions/DBConfig.ini')
        self.host = config['PostgresDB']['host']
        self.port = config['PostgresDB']['port']
        self.database = config['PostgresDB']['database']
        self.user = config['PostgresDB']['user']
        self.password = config['PostgresDB']['password']

    def where_clause_builder(self, division, age_group, gender):
        try:

            result = ""
            if len(division) > 0:
                result += "division='" + division + "'"
            if len(age_group) > 0:
                if result != "":
                    result += " AND "
                result += "age_group='" + age_group + "'"
            if len(gender) > 0:
                if result != "":
                    result += " AND "
                result += "gender='" + gender + "'"
            return "AND " + result if len(result) > 0 else result

        except (Exception) as error:
            print("Failed to select record into teams table", error)

    def select_registered_team_list(self):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()
            # add_later_to_query = "and team_id IN(select team_id from public.payment)"
            select_query = """select array_agg(row_to_json(t)) from 
                                (SELECT *, concat( team_city, ', ', team_state) as address
                                 from public.teams where is_active= True order by team_id) t
                            """
            cursor.execute(select_query)
            teams_json = cursor.fetchall()
            connection.close()
            return teams_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into tournament table", error)

    def select_team_list_by_category(self, division, age_group, gender):
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database,
            )
            cursor = connection.cursor()

            where_clause = self.where_clause_builder(division, age_group, gender)
            # add_later_to_query = "and team_id IN(select team_id from public.payment)"
            select_query = """select array_agg(row_to_json(t)) from 
                                (SELECT *, concat( team_city, ', ', team_state) as address 
                                from public.teams where is_active= True %s order by team_id) t
                            """
            cursor.execute(select_query % where_clause)
            teams_json = cursor.fetchall()
            connection.close()
            return teams_json[0][0]
        except (Exception, psycopg2.Error) as error:
            print("Failed to select record into tournament table", error)

