from bs4 import BeautifulSoup
import time
from selenium import webdriver
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
real = "schedulebuilder-4382d-firebase-adminsdk-xngb1-6c454ccab0.json"
test = 'testing-93869-firebase-adminsdk-ijzr9-98b2b61398.json'
cred = credentials.Certificate("schedulebuilder-4382d-firebase-adminsdk-xngb1-6c454ccab0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
url = 'http://classfind.stonybrook.edu/vufind/Search/Results?type=AllFields&filter%5B%5D=ctrlnum%3A%22Spring+2021%22&filter%5B%5D=geographic_facet%3A%22Undergraduate%22'
driver = webdriver.Chrome(executable_path=r"C:\Users\TOM\Desktop\chromedriver_win32\chromedriver.exe")
driver.maximize_window()
driver.get(url)
count = 0
while True:

    content = driver.page_source
    soup = BeautifulSoup(content, "html.parser")
    l = soup.find('ul', {'class': 'recordSet'})
    for i in l.findChildren('li', recursive=False):
        Lab = False
        course_num = ((i.find('div', {'class': 'span-2'})).find('a', {'class': 'title'}).text)
        course = course_num[1:4]
        section = course_num[-3:len(course_num) - 1]
        course_num = course_num[4:7]
        if course_num[0] < '0' or course_num[0] > '9'  or section[0] < '0' or section[0] > '9':
            continue
        if int(course_num) >= 500 or int(section) >= 90:
            continue
        course_name = ((i.find('div', {'class': 'span-11'})).find('a', {'class': 'title'}).text)
        course_info = ((i.find('div', {'class': 'span-11'})).find('div', {'class': 'resultItemLine1'}).find('a', {'href': 'javascript://'}).find('img').get('title'))
        course_info = course_info.replace('<b>', '')
        course_info = course_info.replace('</b>', '')
        course_info = course_info.replace('<br/>', '\n')
        texts = ((i.find('div', {'class': 'span-11'})).text)
        texts = " ".join(texts.split())
        if texts.find('LEC :') == -1 and texts.find('LEC: ') == -1 and texts.find('SEM :') == -1 and texts.find('LAB :') == -1:
            continue
        texts = texts[texts.find('by') + 3::]
        course_instructor = texts[0:texts.find(' ')].replace(',', ', ')

        #Check for labs/recitations
        recitation_day = None
        recitation_time = None
        extra = ""
        if texts.find('REC :') != -1 or texts.find('LAB :') != -1:
            if texts.find('REC :') != -1:
                texts = texts[(texts.find('REC :') + 5)::]
                extra = "R"
            elif texts.find('LAB :') != -1:
                texts = texts[(texts.find('LAB :') + 5)::]
                extra = "L"
                Lab = True
            if texts.find('RETU') != -1:
                copy = texts[texts.find('RETU') + 2::].split()
                recitation_day = copy[0]
                recitation_time = copy[1]
                extra = "R"
            elif texts.find('RETH') != -1:
                copy = texts[texts.find('RETH') + 2::].split()
                recitation_day = copy[0]
                recitation_time = copy[1]
                extra = "R"
            elif texts.find('RECM') != -1:
                copy = texts[texts.find('RECM') + 3::].split()
                recitation_day = copy[0]
                recitation_time = copy[1]
                extra = "R"
            elif texts.find('RECW') != -1:
                copy = texts[texts.find('RECW') + 3::].split()
                recitation_day = copy[0]
                recitation_time = copy[1]
                extra = "R"
            elif texts.find('RECF') != -1:
                copy = texts[texts.find('RECF') + 3::].split()
                recitation_day = copy[0]
                recitation_time = copy[1]
                extra = "R"
            elif texts[0:3] != "REC":
                copy = texts.split()
                recitation_day = copy[0]
                recitation_time = copy[1]
        rec_start_time, rec_end_time = None, None
        if recitation_time != None:
            rec_start_time, rec_end_time = recitation_time.split('-')[0], recitation_time.split('-')[1]
        if texts.find('LEC :') != -1:
            texts = texts[(texts.find('LEC :') + 5)::]
        elif texts.find('LEC: ') != -1:
            texts = texts[(texts.find('LEC: ') + 5)::]
        elif texts.find('SEM :') != -1:
            texts = texts[(texts.find('SEM :') + 5)::]
        texts = texts.split()
        course_day = texts[0]
        course_time = texts[1]
        if course_time == recitation_time and course_day == recitation_day:
            rec_start_time = None
            rec_end_time = None
            recitation_day = None
        course_start_time, course_end_time = course_time.split('-')[0], course_time.split('-')[1]
        if recitation_day == "FLEX":
            rec_start_time = None
            rec_end_time = None
        if course_day == "FLEX":
            course_start_time = None
            course_end_time = None
        print(course, course_num, section, course_day, course_start_time, course_end_time, recitation_day, rec_start_time, rec_end_time)
        count += 1
        doc_ref = db.collection(u'courses-Spring 2021').document(course).collection(u'courseNum').document(course_num).collection('section').document(section)
        doc_ref.update({
                u'info': course_info,
                u'course_day': course_day,
                u'course_start': course_start_time,
                u'course_end': course_end_time,
                u'rec_day': recitation_day,
                u'rec_start': rec_start_time,
                u'rec_end': rec_end_time,
                u'instructor': course_instructor,
                u'course_name': course + str(course_num) + "-" + extra + str(section)
        })
        doc_ref = db.collection(u'courses-Spring 2021').document(course)
        doc_ref.set({
            u'course': course,
        })

        doc_ref = db.collection(u'courses-Spring 2021').document(course).collection(u'courseNum').document(course_num)
        doc_ref.set({
            u'courseNum': course_num,
        })
        #print(course_num, course_instructor, course_day, course_time, recitation_day, recitation_time)
    try:
        #/html/body/div/div[1]/form
        loadMoreButton = driver.find_element_by_xpath("//a[contains(text(), 'Next')]")
        loadMoreButton.location_once_scrolled_into_view
        loadMoreButton.click()
    except Exception as e:
        print(e)
        break
    time.sleep(0.01)
print("Complete")


'''lst = [s.parent for s in l]
for i in lst:
    name_arr = i.find('span', {'class':'name'}).text.split(',')[:2]
    prof = name_arr[0].strip() + ', ' + name_arr[1].split()[0].strip()
    rating = i.find('span', {'class':'rating'}).text
    print(prof, rating)
    doc_ref = db.collection(u'profratings').document(prof)
    doc_ref.set({
        u'name': prof,
        u'rating': rating
  })'''
print(count)
driver.quit()