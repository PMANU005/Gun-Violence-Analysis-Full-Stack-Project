#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#Cleaning DataSet1


# In[1]:


import pandas as pd
#Reading dataset1 from csv
df1 = pd.read_csv('dataset1.csv')
df1.head()


# In[2]:


#Inorder to convert two letter state abbrevation to full name stored those mapping in dictionary 
us_state_to_abbrev = {
"Alabama": "AL","Alaska": "AK","Arizona": "AZ","Arkansas": "AR","California": "CA","Colorado": "CO", "Connecticut": "CT","Delaware": "DE","Florida": "FL","Georgia": "GA","Hawaii": "HI","Idaho": "ID","Illinois": "IL","Indiana": "IN","Iowa": "IA","Kansas": "KS", "Kentucky": "KY","Louisiana": "LA",
"Maine": "ME","Maryland": "MD","Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN","Mississippi": "MS","Missouri": "MO","Montana": "MT", "Nebraska": "NE","Nevada": "NV","New Hampshire": "NH", "New Jersey": "NJ","New Mexico": "NM","New York": "NY","North Carolina": "NC","North Dakota": "ND","Ohio": "OH","Oklahoma": "OK","Oregon": "OR","Pennsylvania": "PA", "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}
# invert the dictionary
abbrev_to_us_state = dict(map(reversed, us_state_to_abbrev.items()))


# In[3]:


#Converted two leter short cut state name into full name.
df1['State'] = df1['State'].map(lambda x: abbrev_to_us_state.get(x, x))
#Took desired columns from the whole dataset
final_df1 =df1[['Date', 'City' , 'State' , 'Latitude' , 'Longitude']]
#Dropping rows with missing values
final_df1.dropna()


# In[4]:


final_df1


# In[ ]:


#Cleaning DataSet2


# In[5]:


#Reading datase2 from csv
df2 = pd.read_csv('dataset2.csv')
#Renaming columns
df2.rename(columns = {'Incident Date':'Date', 'City Or County':'City'}, inplace = True)
df2.head()


# In[6]:


#Extracting exact address by merging the coolumns 
df2['CompAddress']=df2['Address']+", "+df2['City']+", "+df2['State']+", USA"
df2['PartialAddress']=df2['City']+", "+df2['State']+", USA"


# In[7]:


#Converting date to "YYY-MM-DD" format
df2['Date'] = pd.to_datetime(df2['Date'])


# In[8]:


df2.head()


# In[9]:


#Extracting required columns for geocoding
finaldata2=df2[['Date', 'City' , 'State' , 'CompAddress','PartialAddress']]
finaldata2.dropna()


# In[10]:


finaldata2


# In[11]:


#downloading finaldata2 to local using google sheets to use geocode api and to get corresponding latitude and longitutudes for given address
finaldata2.to_csv('finaldata2.csv')


# In[ ]:


#After gecoding in googlesheets downloaded the "finaldata2 - finaldata2.csv" to local file and read the file from local


# In[18]:


finaldata2 = pd.read_csv('finaldata2 - finaldata2.csv')


# In[13]:


#In this database weh have latitude and longitude
finaldata2.head()


# In[ ]:


#Cleaning dataset3


# In[14]:


#Reading dataset from local
df3 = pd.read_csv('datset3-b8243c3bcdfe.csv')
df3.head()


# In[15]:


df3.rename(columns = {'Incident Date':'Date', 'City Or County':'City'}, inplace = True)
df3['CompAddress']=df3['Address']+", "+df3['City']+", "+df3['State']+", USA"
df3['Date'] = pd.to_datetime(df3['Date'])
#Dropping rows whose adress column as na values.
df3=df3.dropna(subset=['Address'])
finaldata3=df3[['Date', 'City' , 'State' , 'CompAddress']]
finaldata3.head()


# In[ ]:


#downloading finaldata3 to local using google sheets to use geocode api and to get corresponding latitude and longitutudes for given address
finaldata3.to_csv('finaldata3.csv')


# In[17]:


#After gecoding in googlesheets downloaded the "finaldata2 - finaldata2.csv" to local file and read the file from local
finaldata3=pd.read_csv('finaldata3 - finaldata3.csv')


# In[ ]:


#Merging three databases 


# In[19]:


final_df2=finaldata2[['Date', 'City' , 'State','Latitude','Longitude']]
final_df3=finaldata3[['Date', 'City' , 'State', 'Latitude','Longitude']]


# In[20]:


final_df1.head()


# In[21]:


final_df2.head()


# In[22]:


final_df3.head()


# In[23]:


finaldatabase=pd.concat([final_df1,final_df2,final_df3],ignore_index = True)
finaldatabase


# In[24]:



finaldatabase=finaldatabase.dropna(subset=["Latitude", "Longitude"])
finaldatabase= finaldatabase.drop_duplicates(subset=["Latitude", "Longitude"], keep='first')
finaldatabase


# In[27]:


#Got the desired database and columns
finaldatabase.to_csv('finaldatabase.csv')


# In[3]:





# In[7]:





# In[ ]:




