import json
from db.functions.DBScheduleMatches import DBScheduleMatches
from db.functions.DBFilterMatches import DBFilterMatches

class FetchMatchDetails():

    def get_matches(self):
        dsm = DBScheduleMatches()
        matches = dsm.select_all_matches()
        return {"matches": matches}

    def get_matches_by_teamid(self, team_id):
        dfm = DBFilterMatches()
        matches = dfm.select_matches_by_teamid(team_id)
        return {"matches": matches}