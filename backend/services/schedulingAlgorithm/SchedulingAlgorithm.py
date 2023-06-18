# from db.functions.DBGetTeamDetail import DBGetTeamDetail
from db.functions.DBScheduleMatches import DBScheduleMatches


class SchedulingAlgorithm():
    def __init__(self):
        self.matches_with_ground = {}
        self.ground_type_count = {}

    def dict_to_list(self, dict_items, key):
        ans = []
        for x in dict_items:
            ans.append(x[key])
        return ans

    def make_pair(self, team_list):
        # if team_list is None or len(team_list)%2 > 0:
        #     return None
        ans = []
        for i in range(0, len(team_list), 2):
            ans.append([team_list[i], team_list[i + 1]])
        return ans

    def get_division_list(self):
        db = DBScheduleMatches()
        division_list = db.select_division_list()
        return division_list

    def get_age_group_list(self):
        db = DBScheduleMatches()
        age_group_list = db.select_age_group_list()
        return age_group_list

    def get_gender_list(self):
        db = DBScheduleMatches()
        gender_list = db.select_gender_list()
        return gender_list

    def set_ground_keys(self, field_list):
        # print(field_list)
        for x in field_list:
            key = (x["age_start"], x["age_end"])
            if self.ground_type_count.get(key) is not None:
                self.ground_type_count[key]["count"] += 1
                self.ground_type_count[key]["ground_number_list"].append(x["ground_number"])
            else:
                list_ground_number = list()
                list_ground_number.append(x["ground_number"])
                self.ground_type_count[key] = {
                    "count": 1,
                    "ground_number_list": list_ground_number
                }

    def find_key_for_age(self, age):
        for key in self.ground_type_count.keys():
            if key[0] <= age <= key[1]:
                return key
        return None

    def schedule_matches(self, team_pairs, ground_num, day_num):
        dsm = DBScheduleMatches()
        slots =["9:00AM", "10:05AM", "11:10AM", "2:00PM", "3:05PM", "4:10PM"]
        i = 0
        for match in team_pairs:
            if(i == len(slots)):
                i = 0
            team_1_id = match[0]['team_id']
            team_2_id = match[1]['team_id']
            ground_number = ground_num
            match_date = day_num
            match_time = slots[i]
            match_age_group = match[0]['age_group']
            match_gender = match[0]['gender']
            match_division = match[0]['division']
            dsm.insert_match_details(team_1_id, team_2_id, ground_number, match_date, match_time,
                                     match_age_group, match_gender,match_division)
            i += 1

    def insert_match_details(self):
        for key, team_groups in self.matches_with_ground.items():
            ground_nums = self.ground_type_count[key]['ground_number_list']
            ground_counts = self.ground_type_count[key]['count']

            day = 0
            i = 0
            for grp in team_groups:
                if i == ground_counts:
                    i = 0
                    day += 1
                self.schedule_matches(grp, ground_nums[i], day)
                i += 1

    def execute_scheduler(self):
        division_list = self.get_division_list()
        age_group_list = self.get_age_group_list()
        gender_list = self.get_gender_list()
        dsm = DBScheduleMatches()

        # get field list
        field_list = dsm.select_field_type_list()
        self.set_ground_keys(field_list)

        for div in division_list:
            for gen in gender_list:
                for age in age_group_list:
                    filtered_teams = dsm.select_filtered_team_list(div, gen, age)
                    if filtered_teams is not None:
                        # list_filtered_teams = self.dict_to_list(filtered_teams, "team_id")
                        if len(filtered_teams) % 2 == 0:
                            age_range = self.find_key_for_age(age)
                            if age_range is None:
                                print("Error")
                                return
                            paired_team = self.make_pair(filtered_teams)

                            if self.matches_with_ground.get(age_range) is None:
                                list_team_pairs = list()
                                list_team_pairs.append(paired_team)
                                self.matches_with_ground[age_range] = list_team_pairs
                            else:
                                self.matches_with_ground[age_range].append(paired_team)
        self.insert_match_details()
        matches = dsm.select_all_matches()
        return {"matches": matches}
        # return_msg = {
        #     "message": "All matches scheduled successfully"
        # }
        # return return_msg
