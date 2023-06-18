import json
from db.functions.DBScheduleMatches import DBScheduleMatches

class CheckMatchesScheduled():

    def matches_count(self):
        dsm = DBScheduleMatches()
        count = dsm.get_scheduled_match_count()
        return count