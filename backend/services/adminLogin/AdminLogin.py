import json
from db.functions.DBUserLogin import DBUserLogin

class AdminLogin():

    def login(self, request):
        request_body = request.stream.read()
        json_data = json.loads(request_body)
        
        username = json_data["username"]
        password = json_data["password"]

        dbul = DBUserLogin()
        user_detail = dbul.select_user(username, password)

        user_exist = False
        if user_detail is not None:
            if len(user_detail) == 1:
                user_exist = True
        print(user_detail)

        return_data = {
            "user_exist": user_exist,
            "user_role": None if user_detail is None else user_detail[0]["user_role"],
            "is_admin": None if user_detail is None else user_detail[0]["is_admin"]
        }
        return return_data
