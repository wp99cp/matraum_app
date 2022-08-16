from __future__ import print_function
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

"""
Shows basic usage of the Gmail API.
Lists the user's Gmail labels.
"""
creds = None

# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'client_secret.json', SCOPES)
        creds = flow.run_local_server(port=0)
        
    # Save the credentials for the next run
    with open('token.json', 'w') as token:
        token.write(creds.to_json())
        
service = build('gmail', 'v1', credentials=creds)

# Init firebase
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("matraum-app-firebase.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

from datetime import datetime
import base64
import html2text


stufen_names = ['amos', 'sinai', 'nameless', 'fröschli', 'esperia', 'masada', 'enomine']

for stufen_name in stufen_names:

    # Call the Gmail API
    results = service.users().messages().list(userId='me', q='label:materialbestellungen-stufen-' + stufen_name, maxResults=1).execute()
    latest_message = results['messages'][0]['id']
    message = service.users().messages().get(userId='me', id=latest_message, format='full').execute()
        
    if 'parts' in message['payload']:
        message_text = str(base64.urlsafe_b64decode(message['payload']['parts'][1]['body']['data']), errors='ignore')
    else:
        message_text = str(base64.urlsafe_b64decode(message['payload']['body']['data']), errors='ignore')
        
    db.document('newest_orders/' + stufen_name).set({
        'order_message': message_text,
        'order_date': datetime.fromtimestamp(int(message['internalDate']) / 1000)
    })
    