import json
import psycopg2
from db.functions.DBFilterMatches import DBFilterMatches

class FilterMatchDetails():

    def filter_matches(self, request):
        request_body = request.stream.read()
        json_data = json.loads(request_body)

        division = ""
        day = ""
        venue = ""
        team_id = ""
        club_name = ""

        if json_data.get("division"):
            division = json_data.get("division").lower()
        if json_data.get("day"):
            day = json_data.get("day").lower()
        if json_data.get("venue"):
            venue = str(json_data.get("venue")).lower()
        if json_data.get("team_id"):
            team_id = str(json_data.get("team_id")).lower()
        if json_data.get("club_name"):
            club_name = str(json_data.get("club_name")).lower()

        dbfm = DBFilterMatches()
        filtered_matches = dbfm.select_filtered_match_list(division, day, venue, team_id, club_name)

        filtered_matches_restructures = []
        if filtered_matches is not None:
            for key, value in enumerate(filtered_matches):
                value["id"] = key
                filtered_matches_restructures.append(value)
        return {"matches": filtered_matches_restructures if filtered_matches_restructures is not None else []}
