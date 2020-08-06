from bs4 import BeautifulSoup
import time
from selenium import webdriver
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("schedulebuilder-4382d-firebase-adminsdk-xngb1-16814afacf.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

driver = webdriver.Chrome(executable_path='/usr/local/bin/chromedriver')
driver.maximize_window()
driver.get('https://www.ratemyprofessors.com/search.jsp?queryoption=TEACHER&queryBy=schoolDetails&schoolID=971&schoolName=Stony+Brook+University+%28SUNY%29&dept=select')

while True:
    try:
        loadMoreButton = driver.find_element_by_xpath('/html/body/div[3]/div[4]/div/div[1]/div/div[5]/div/div[1]')
        loadMoreButton.location_once_scrolled_into_view
        loadMoreButton.click()
    except Exception as e:
        print(e)
        break
    time.sleep(1)
print("Complete")

content = driver.page_source
soup = BeautifulSoup(content, features='lxml')
l = soup.findAll('span', {'class':'name'})
lst = [s.parent for s in l]
for i in lst:
    name_arr = i.find('span', {'class':'name'}).text.split(',')[:2]
    prof = name_arr[0].strip() + ', ' + name_arr[1].split()[0].strip()
    rating = i.find('span', {'class':'rating'}).text
    doc_ref = db.collection(u'profratings').document(prof)
    doc_ref.set({
        u'name': prof,
        u'rating': rating
    })

driver.quit()

