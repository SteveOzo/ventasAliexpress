import MySQLdb
import torndb
import tornado.escape
import os.path
from tornado import gen
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.options import define, options
from time import gmtime, strftime
import time
import base64
import calendar
import datetime

now = datetime.datetime.now()
fecha = strftime("%Y-%m-%d %H:%M:%S", time.localtime())
#mesactual = now.month
mesactual = 12
yearpagar = now.year
mespagar = mesactual + 1

if mespagar == 13:
    mespagar = 1
    yearpagar = yearpagar + 1

mespagar = calendar.month_name[mespagar]

print str(yearpagar)+"-"+mespagar+"-"+str(15)
