#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS


def connect_to_db():
    conn = sqlite3.connect('/Users/tomaskudlicka/Code/NBA_stats/backend/db.sqlite')
    return conn


def get_players():
    players = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute('SELECT p.id,p.first_name,p.last_name,p.slug,cpi.team_abbreviation,cpi.country,cpi.weight,cpi.height,cpi."position" FROM player p LEFT JOIN common_player_info cpi ON cpi.player_slug=p.slug')
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            player = {}
            player['id'] = i['id']
            player['first_name'] = i['first_name']
            player['last_name'] = i['last_name']
            player['slug'] = i['slug']
            player['country'] = i['country']
            player['weight'] = i['weight']
            player['height'] = i['height']
            player['team_abbreviation'] = i['team_abbreviation']
            player['position'] = i['position']
           
            players.append(player)

    except :
        players = []

    return players

def get_teams():
    teams = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT id,full_name,abbreviation,nickname,city,state,year_founded FROM team")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            team = {}
            team['id'] = i['id']
            team['full_name'] = i['full_name']
            team['abbreviation'] = i['abbreviation']
            team['nickname'] = i['nickname']
            team['city'] = i['city']
            team['state'] = i['state']
            team['year_founded'] = i['year_founded']
           
            teams.append(team)

    except :
        teams = []

    return teams


def get_player_by_slug(slug):
    player = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute('SELECT p.id,p.first_name,p.last_name,p.slug,cpi.birthdate,cpi.season_exp,cpi.team_city,cpi.team_name,cpi.jersey,cpi.team_abbreviation,cpi.country,cpi.school,cpi.weight,cpi.height,cpi.draft_year,cpi.draft_round,cpi.draft_number,cpi."position" FROM player p LEFT JOIN common_player_info cpi ON cpi.player_slug=p.slug WHERE slug = ?', [slug])
        i = cur.fetchone()

        player = {}
        player['id'] = i['id']
        player['first_name'] = i['first_name']
        player['last_name'] = i['last_name']
        player['slug'] = i['slug']
        player['country'] = i['country']
        player['weight'] = i['weight']
        player['birthdate'] = i['birthdate'];
        player['season_exp'] = i['season_exp'];
        player['team_city'] = i['team_city'];
        player['team_name'] = i['team_name'];
        player['jersey'] = i['jersey'];
        player['team_abbreviation'] = i['team_abbreviation'];
        player['country'] = i['country'];
        player['school'] = i['school'];
        player['weight'] = i['weight'];
        player['height'] = i['height'];
        player['draft_year'] = i['draft_year'];
        player['draft_round'] = i['draft_round'];
        player['draft_number'] = i['draft_number'];
        player['position'] = i['position'];
    except Exception as error:
        print(error)
        player = {}

    return player


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/player', methods=['GET'])
def api_get_players():
    return jsonify(get_players())

@app.route('/api/player/<slug>', methods=['GET'])
def api_get_user(slug):
    return jsonify(get_player_by_slug(slug))

@app.route('/api/team', methods=['GET'])
def api_get_teams():
    return jsonify(get_teams())


if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run()
