from bs4 import BeautifulSoup
import time
from selenium import webdriver
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("schedulebuilder-4382d-firebase-adminsdk-xngb1-6c454ccab0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
login = input("Enter your username: ")
p = input("Enter your password: ")
driver = webdriver.Chrome(executable_path=r"C:\Users\TOM\Desktop\chromedriver_win32\chromedriver.exe")
driver.maximize_window()
driver.get('https://classie-evals.stonybrook.edu/')
user = driver.find_element_by_id('username').send_keys(login)
password = driver.find_element_by_id('password').send_keys(p)
button = driver.find_element_by_xpath("//button")
button.click()
d = db.collection('courses-Spring 2020').get()
lecture = None
sec = "0"
lec = "0"
works = 0
for h in range(0, len(d)):
    #checks for course
    courses = d[h].to_dict()
    print(courses['course'])
    docs = db.collection('courses-Spring 2020').document(courses['course']).collection('courseNum').get()
    doc_ref = db.collection(u'Evals Spring 2020').document(courses['course'])
    doc_ref.set({
        u'course': courses['course'],
    })
    for i in range(0, len(docs)):
        # checks for course number
        information = docs[i].to_dict()
        doc_ref = db.collection(u'Evals Spring 2020').document(courses['course']).collection(u'courseNum').document(information['courseNum'])
        doc_ref.set({
            u'courseNum': information['courseNum'],
        })
        try:
            driver.find_element_by_id('SearchKeyword').clear()
            Search = driver.find_element_by_id('SearchKeyword').send_keys(courses['course'] + information['courseNum'])
        except Exception as e:
            continue
        SearchTerm = driver.find_element_by_id('SearchTerm').send_keys('Spring 2020')
        button = driver.find_element_by_xpath("//button[contains(text(), 'Go')]")
        button.click()
        lec = "01"
        lecture = None
        section_arr = {}
        sections = db.collection('courses-Spring 2020').document(courses['course']).collection('courseNum').document(information['courseNum']).collection('section').get()
        for j in range(0, len(sections)):
            #checks for section number
            section = sections[j].to_dict()
            s = "//a[contains(text(), '" + section['course_name'] + "')]"
            print(section['course_name'])
            try:
                c = driver.find_element_by_xpath(s)
                c.click()
            except Exception as e:
                continue
            else:
                found = None
                Class = None
                if section['course_day'] == "FLEX":
                    if section['rec_day'] != None:
                        Class = "R " + section['rec_day'] + " " + section['rec_start'] + "-" + section['rec_end']
                    else:
                        Class = section['course_day']
                else:
                    Class = section['course_day'] + " " + section['course_start'] + "-" + section['course_end']
                try:
                    found = section_arr[Class]
                except Exception as e:
                    section_arr[Class] = {'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0, 'C-': 0, 'D+': 0,
                    'D': 0, 'F': 0, 'I': 0, 'NC': 0, 'P': 0,'S': 0, 'U': 0, 'W': 0}

            new_page = driver.page_source
            new_content = BeautifulSoup(new_page, "html.parser")
            p = new_content.find('tbody')
            if p != None:
                p = p.findAll('tr')
            else:
                continue
            for j in range(0, len(p)):
                k = p[j].findAll("td")
                section_arr[Class][k[0].text] += int(k[1].text)
            driver.back()
        count = "01"
        for key in section_arr:
            ref = db.collection(u'Evals Spring 2020').document(courses['course']).collection('courseNum').document(
                information['courseNum']).collection('section').document(count)
            new_page = driver.page_source
            new_content = BeautifulSoup(new_page, "html.parser")
            value = None

            f = None
            prof = None
            try:
                rec = ""
                if section_arr[key][0] == "R":
                    rec = "R"
                f = new_content.findAll('a', text = courses['course'] + information['courseNum'] + '-' + rec + count)[0].parent.parent
                prof = f.findAll("td")[2].text
                prof = prof[1:len(prof) - 1]
                prof = prof.split()
                prof = prof[1] + ", " + prof[0]
            except Exception as e:
                f = None
            ref.set({
                u'grades': section_arr[key],
                u'instructor': prof,
            })
            if int(count) + 1 <= 9:
                count = "0" + str(int(count) + 1)
            else:
                count = str(int(count) + 1)
driver.quit()
"""for i in range(0, len(docs)):
    if int(sec) < 9:
        sec = "0" + str((int(sec) + 1))
    else:
        sec = str((int(sec) + 1))
    information = docs[works].to_dict()
    c = information['course_name']
    s = "//a[contains(text(), '" + c + "')]"
    try:
        c = driver.find_element_by_xpath(s)
        c.click()
    except Exception as e:
        continue
    information = docs[works].to_dict()
    works += 1
    if lecture != information['course_day'] + " " + information['course_start'] + "-" + information['course_end']:
        lecture = information['course_day'] + " " + information['course_start'] + "-" + information['course_end']
        #save to database and then reset
        print(lec, grades)
        grades = {'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0, 'C-': 0, 'D+': 0, 'D': 0, 'F': 0, 'I': 0,
                  'W': 0}
        lec = "0" + str(int(lec) + 1)
    new_page = driver.page_source
    new_content = BeautifulSoup(new_page, "html.parser")
    p = new_content.find('tbody').findAll('tr')
    for j in range(0, len(p)):
        k = p[j].findAll("td")
        grades[k[0].text] += int(k[1].text)
    driver.back()
    print(sec, len(docs))
print(lec, grades, sum(grades.values()))"""
"""for i in range(1, 8):
    c = 'CSE220-R0' + str(i)
    s = "//a[contains(text(), '" + c + "')]"
    try:
        c = driver.find_element_by_xpath(s)
    except Exception as e:
        continue
    c.click()
    new_page = driver.page_source
    new_content = BeautifulSoup(new_page, "html.parser")
    p = new_content.find('tbody').findAll('tr')
    for j in range(0, len(p)):
        k = p[j].findAll("td")
        grades[k[0].text] += int(k[1].text)
    driver.back()

for key in grades:
    print(key, str(grades[key] * 100/sum(grades.values())) + "%")

"""
"""while True:
    try:
        login = driver.find_element_by_xpath("//input")
        #print(login)
    except Exception as e:
        print(e)
        break
    time.sleep(1)
print("Complete")"""

"""content = driver.page_source
soup = BeautifulSoup(content, "html.parser")
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
"""
