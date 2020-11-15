import pandas as pd
import urllib.request
import os

data = pd.read_csv('vision_product_search_product_catalog.csv',index_col=False, names=['A', 'B', 'C', 'D','E','F','G'])

# uri = data.iloc[:,0]
# image_name = data.iloc[:,1]

# uri_and_image_name = data.iloc[:,[0,1]]

img_folder = os.path.join(os.getcwd(),'img')
# uri = data['A']
# print(uri.head())
for index, row in data.iterrows():
    # print(row['A'])
    uri = row[0]
    image_url = uri.replace('gs://','https://storage.googleapis.com/')
    image_name = row[1]
    urllib.request.urlretrieve(image_url, os.path.join(img_folder, f'{image_name}.jpg'))
# print(uri_and_image_name.head())
# for ind in data.head().index:

    
#     print(f'uri: {uri_and_image_name['A'][ind]} \nimage name: {uri_and_image_name['B'][ind]}')
#     # index, uri, imageName = row
#     print(row)

#     # print(f'uri: {uri} image name: {imageName}')


