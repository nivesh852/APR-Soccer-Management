from db.functions.DBGetTeamDetail import DBGetTeamDetail

class GetFilterParameters():

    def get_division_list(self):
        db = DBGetTeamDetail()
        division_list = db.select_division_list()
        return division_list

    def get_age_group_list(self):
        db = DBGetTeamDetail()
        age_group_list = db.select_age_group_list()
        return age_group_list

    def get_gender_list(self):
        db = DBGetTeamDetail()
        gender_list = db.select_gender_list()
        return gender_list

    def get_match_date_list(self):
        db = DBGetTeamDetail()
        match_date_list = db.select_match_date_list()
        return match_date_list

    def get_club_list(self):
        db = DBGetTeamDetail()
        club_list = db.select_club_list()
        return club_list

    def get_team_list(self):
        db = DBGetTeamDetail()
        team_list = db.select_team_list()
        modified_for_filter = []
        for x in team_list:
            temp = {"id": x["team_id"]}
            # if x["gender"] == "M":
            #     gender = "B"
            # else:
            #     gender = "G"
            temp["value"] = x["gender"] + str(x["age_group"]) + x["division"] \
                                   + " - " + x["team_name"] + " (" + x["coach_name"] + ")"
            modified_for_filter.append(temp)
        return modified_for_filter

    def get_venue_list(self):
        db = DBGetTeamDetail()
        venue_list = db.select_venue_list()
        modified_for_filter = []
        for x in venue_list:
            temp = {"id": x["field_id"]}
            temp["value"] = str(x["field_name"]) +" (" + x["field_acronym"] + ")"
            modified_for_filter.append(temp)
        return modified_for_filter

    def get_all_filter_params(self):
        division_list = self.get_division_list()
        age_group_list = self.get_age_group_list()
        gender_list = self.get_gender_list()
        team_list = self.get_team_list()
        venue_list = self.get_venue_list()
        match_date_list = self.get_match_date_list()
        club_list = self.get_club_list()
        data = {
            "division" : division_list,
            "age_group": age_group_list,
            "gender": gender_list,
            "teams": team_list,
            "venue": venue_list,
            "day": match_date_list,
            "club": club_list
        }
        return data
