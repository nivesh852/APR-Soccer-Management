import json
import datetime as dt
# from datetime import datetime
from db.functions.DBTournamentDetails import DBTournamentDetails


class GenerateTeamRegistrationAmount():

    def registration_payment(self):
        dbtd = DBTournamentDetails()
        tournament_details = dbtd.get_tournament_details()

        currentDate = dt.datetime.today()
        registration_date = dt.datetime.strptime(tournament_details[0]['payment_due_date'], "%Y-%m-%d")
        registration_fee = int(tournament_details[0]['tournament_fee'])

        time_difference = registration_date - currentDate
        delta = time_difference.days

        message = ""
        registration_open = True
        if (delta > 45):
            message = "You are too early to register"
        elif (30 < delta < 45):
            registration_fee = registration_fee - ((registration_fee * 15) / 100)
            message = "To register the team, you need to pay :" + str(registration_fee)
        elif (15 < delta < 10):
            message = "To register the team, you need to pay " + str(registration_fee)
        elif (0 < delta < 15):
            registration_fee = registration_fee + ((registration_fee * 10) / 100)
            message = "To register the team, you need to pay " + str(registration_fee)
        elif (delta < 0):
            registration_open = False
            message = "You cannot make this payment, You are late for competition!"
        return_data = {"registration_open": registration_open, "message": message}
        return_data["registration_fee"] = registration_fee
        # if registration_open:
        #     return_data["registration_fee"] = registration_fee
        return return_data
