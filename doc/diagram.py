from diagrams import Cluster, Diagram, Edge
from diagrams.aws.compute import Lambda
from diagrams.aws.network import APIGateway
from diagrams.onprem.compute import Server

with Diagram("Dynamic Rendering API", show=False):
  server = Server("web page")

  with Cluster("Dynamic Rendering"):
    api = APIGateway("api")
    fn = Lambda("puppeteer")

  api >> fn >> server
