import json
from db.functions.DBTeamFeePayment import DBTeamFeePayment

class TeamFeePayment():

    def save_team_payment(self, request):
        req_data = request.stream.read()
        json_data = json.loads(req_data)
        team_id = json_data['team_id']
        payment_amount = json_data['payment_amount']

        dtfp = DBTeamFeePayment()
        check_team_fee_paid_data = dtfp.check_already_paid(team_id)
        transaction_id = ""

        if check_team_fee_paid_data["count"] == 0:
            transaction_id = dtfp.insert_team_fee_payment(team_id, payment_amount)
        else:
            txt = "Already Paid"


        message = "Congrats!!! You are now enrolled to the tournament."

        return_data = {
            "message": message,
            "team_id": team_id,
            "payment_success": True
        }
        if check_team_fee_paid_data["count"] == 0:
            return_data["transaction_id"] = transaction_id
        return return_data