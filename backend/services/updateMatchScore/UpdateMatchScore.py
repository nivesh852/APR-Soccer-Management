import json
from db.functions.DBMatchScoreUpdate import DBMatchScoreUpdate

class UpdateMatchScore():

    def scores_update(self, request):
        request_body = request.stream.read()
        json_data = json.loads(request_body)

        team_1_name = ""
        team_2_name = ""
        team_1_goal = ""
        team_2_goal = ""
        match_stage = "group"
        winner = ""
        match_result = ""

        if json_data.get("team_1_name"):
            team_1_name = str(json_data.get("team_1_name")).lower()
        if json_data.get("team_2_name"):
            team_2_name = str(json_data.get("team_2_name")).lower()
        if json_data.get("team_1_goal"):
            team_1_goal = str(json_data.get("team_1_goal")).lower()
        if json_data.get("team_2_goal"):
            team_2_goal = str(json_data.get("team_2_goal")).lower()
        if json_data.get("match_stage"):
            match_stage = str(json_data.get("match_stage")).lower()
        if json_data.get("winner"):
            winner = str(json_data.get("winner")).lower()
        if json_data.get("match_result"):
            match_result = str(json_data.get("match_result")).lower()

        dmsu = DBMatchScoreUpdate()
        msg, update_status = dmsu.update_team_score(team_1_name, team_2_name, team_1_goal, team_2_goal, match_stage, winner, match_result)

        return_data = {
            "message": msg,
            "update_status" : update_status
        }
        return return_data
