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

define("port", default=8888, help="run on the given port", type=int)
define("mysql_host", default="127.0.0.1:3306", help="database host")
define("mysql_database", default="aliexpress", help="database name")
define("mysql_user", default="root", help="database user")
define("mysql_password", default="Chucuri1412", help="database password")

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", HomeHandler),
            (r"/logout", LogoutHandler),
            (r"/main/ventas", VentasHandler),
            (r"/main/productos", ProductosHandler),
            (r"/main/clientes", ClientesHandler),
            (r"/main/contabilidad", ContabilidadHandler),
            (r"/main/nuevaventa", NewSellHandler),
            (r"/main/nuevocliente", NewClientHandler),
            (r"/main", MainHandler)
        ]

        settings = dict(
            page_title=u"Ventas Aliexpress",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            #ui_modules={"Entry": EntryModule},
            xsrf_cookies=True,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            login_url="/",
            debug=True,
        )
        super(Application, self).__init__(handlers, **settings)
        # Have one global connection to the blog DB across all handlers
        self.db = torndb.Connection(
            host=options.mysql_host, database=options.mysql_database,
            user=options.mysql_user, password=options.mysql_password)

class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
        return self.application.db

    def get_current_user(self):
        id_user = self.get_secure_cookie("usuarioAli")
        if not id_user: return None
        return self.db.get("SELECT * FROM Usuarios WHERE idUsuario = %s", int(id_user))


class HomeHandler(BaseHandler):
    def get(self):
        self.render("index.html", error=None, menu=None)

    @gen.coroutine
    def post(self):
        user = self.db.get("SELECT * FROM Usuarios WHERE Usuario = %s",
                             self.get_argument("usuario"))
        if not user:
            self.render("index.html", error="user not found", menu=None)
            return
        password = self.get_argument("password")
        if password == user.Password:
            self.set_secure_cookie("usuarioAli", str(user.idUsuario))
            self.redirect(self.get_argument("next", "/main"))
        else:
            self.render("index.html", error="incorrect password", menu=None)

class MainHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        productos=self.db.query("SELECT * FROM Productos")
        self.render("main.html", menu=True, productos=productos)


class VentasHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        ventas=self.db.query("SELECT * FROM Ventas")
        self.render("ventas.html", menu=True, ventas=ventas)

class ClientesHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        clientes=self.db.query("SELECT * FROM Clientes")
        self.render("clientes.html", menu=True, clientes=clientes)

class ProductosHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        productos=self.db.query("SELECT * FROM Productos")
        self.render("clientes.html", menu=True, productos=productos)


class ContabilidadHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        ventas=self.db.query("SELECT * FROM Ventas")
        self.render("contabilidad.html", menu=True, ventas=ventas)


class NewClientHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("nuevocliente.html", menu=True, message=None)

    @tornado.web.authenticated
    def post(self):
        nombre = self.get_argument("nombre")
        telefono = self.get_argument("telefono")
        facebook = self.get_argument("facebook")
        self.db.execute(
                        "INSERT INTO Clientes (Nombre, Telefono, Facebook) VALUES (%s,%s,%s)",
                        nombre, telefono, facebook)
        self.render("nuevocliente.html", menu=True, message="Usuario Ingresado Con Exito")

class NewSellHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("nuevaventa.html", menu=True)

class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie("usuarioAli")
        self.redirect(self.get_argument("next", "/"))

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
