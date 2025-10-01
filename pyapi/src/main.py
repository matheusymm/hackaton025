# file: main.py
from fastapi import FastAPI
import os
from openai import OpenAI
from dotenv import load_dotenv
import spacy
import urllib.parse
load_dotenv()
app = FastAPI()


@app.get("/healthcheck")
def read_root():
    print(os.getenv("OPENAI_API_KEY"))
    return {"message": "ok"}


# POST endpoint
@app.post("/")
def echo(data: dict):
    print(data)
    context = data["context"]
    generationType = data["type"]
    response = ""
    if(generationType == "generic"):
        generator = localApiStrategy()
        response = generator.getQuery(context)
    else:
        generator = openApiStrategy()
        stringGenerated = generator.getQuery(context)
        response = urllib.parse.quote(stringGenerated, safe='')
        print(response)
    return {"queryString": response}

class genericStrategy: 
    
    def getQuery(self, context: str):
        pass
    def preProcessedStr(self):
        return "Dado esse texto acima retorne SOMENTE as palavras chaves separadas com '+' para que eu possa compor uma string de busca."

class localApiStrategy(genericStrategy):
    nlp = spacy.load("pt_core_news_sm")

    def getQuery(self, context: str)-> str:
        doc = self.nlp(context)
        keywords = [token.text for token in doc if token.pos_ in ["NOUN", "PROPN"]]
        query = urllib.parse.urlencode({"q": " ".join(keywords)})
        return query

class openApiStrategy(genericStrategy):
    apiKey = os.getenv("OPENAI_API_KEY")
    openApiClient = None
    def getQuery(self, context: str)-> str:
        client  = self.initializeClient()
        
        fullMsg = context + self.preProcessedStr()
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": fullMsg}]
        )
        return response.choices[0].message.content
    def initializeClient(self):
        if(not self.openApiClient):
            self.openApiClient = OpenAI(api_key=self.apiKey)
            return self.openApiClient
        return self.openApiClient
