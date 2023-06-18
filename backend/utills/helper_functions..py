import json
def request_stream(req):
    req_body = req.stream.read()
    json_data = json.loads(req_body.decode('utf8'))
    return json_data
