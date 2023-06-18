import json
from db.functions.DBFetchTeamList import DBFetchTeamList

class FetchTeamList():

    def get_registered_team_list(self):
        dftl = DBFetchTeamList()
        enrolled_team_list_data = dftl.select_registered_team_list()
        return_data = {
            "enrolled_teams": enrolled_team_list_data
        }
        return return_data

    def get_team_list_by_category(self, request):
        req_data = request.stream.read()
        json_data = json.loads(req_data)
        division = ""
        age_group = ""
        gender = ""

        if json_data.get("division"):
            division = json_data.get("division").lower()

        if json_data.get("age_group"):
            age_group = json_data.get("age_group").lower()

        if json_data.get("gender"):
            gender = json_data.get("gender").lower()

        dftl = DBFetchTeamList()
        enrolled_team_list_data = dftl.select_team_list_by_category(division, age_group, gender)
        return_data = {
            "enrolled_teams": enrolled_team_list_data
        }
        return return_data
