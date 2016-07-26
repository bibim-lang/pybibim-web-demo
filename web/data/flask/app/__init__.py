# -*- coding: utf-8 -*-
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

from os import remove
from subprocess32 import Popen, PIPE, TimeoutExpired
from uuid import uuid4
from flask import Flask, render_template, request
from app import config as config


app = Flask(__name__)
app.config.from_object(config)


@app.route('/')
def index():
    return render_template('index.jinja2')


@app.route('/run', methods=['POST'])
def run():
    is_timeout = False
    code = request.form.get('code')
    stdin = request.form.get('stdin')
    code_filename = "/tmp/" + str(uuid4())
    try:
        with open(code_filename, "w") as code_file:
            code_file.write(code)
        p = Popen(
            ['bbm', code_filename],
            stdout=PIPE,
            stdin=PIPE,
            stderr=PIPE
        )
        stdout, stderr = p.communicate(input=stdin, timeout=15)
    except TimeoutExpired:
        is_timeout = True
        p.kill()
        stdout, stderr = p.communicate()
    finally:
        remove(code_filename)
    result = stdout.decode() + stderr.decode()
    if is_timeout:
        result = '-- timeout --\n' + result
    return result
