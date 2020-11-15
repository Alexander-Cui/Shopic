import os
from flask import Flask,flash, request, redirect, url_for, jsonify
from flask import render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
import sama_api as sa
from PIL import Image

from google.cloud import vision
import google_api as g

app = Flask(__name__)
CORS(app)

project_id='shopic'
location='us-east1'
product_set_id='product_set0'

UPLOAD_FOLDER = os.path.join(os.getcwd(),'img')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def hello_world():
    # image = g.get_reference_image(project_id,location,'product_id94','image94')
    # uri = image.uri.replace('gs://','https://storage.googleapis.com/')
    # print(f'the uri is: {uri}')
    # hello="no"
    # g.list_products(project_id,location)
    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        print('i have been called')
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            #above is normal file upload saving to img directory
            # segmap, id_to_class, img = sa.get_segmap_printId(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # Under is calling google API
            results = g.get_similar_products_file(project_id,
            location, 
            product_set_id,
            'apparel-v2',
            encode_image(file), 
            'style = women')
            return jsonify({'data':results})
            
def encode_image(image):
  image_content = image.read()
  return base64.b64encode(image_content)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        base_64 = request.json['base64']
        results = g.get_similar_products_file(project_id,
            location, 
            product_set_id,
            'apparel-v2',
            base_64, 
            'style = women')
        return jsonify({'data':results})

@app.route('/mask', methods=['POST'])
def mask():
    if request.method == 'POST':
        print('i have been called')
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    segmap, id_to_class, img = sa.get_segmap_printId(os.path.join(app.config['UPLOAD_FOLDER'], filename))
  
    
    return jsonify(id_to_class)

@app.route('/segment', methods=['GET','POST'])
def segment():
    # if request.method == 'POST':
    #     print('i have been called')
    # # check if the post request has the file part
    # if 'file' not in request.files:
    #     flash('No file part')
    #     return redirect(request.url)
    # file = request.files['file']
    # # if user does not select file, browser also
    # # submit an empty part without filename
    # if file.filename == '':
    #     flash('No selected file')
    #     return redirect(request.url)
    # if file and allowed_file(file.filename):
    #     filename = secure_filename(file.filename)
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    id_ = request.json['id']
    filename = request.json['filename']

    segmap, id_to_class, img = sa.get_segmap_printId(filename)
    
    new_img = sa.isolate_apparel(img, segmap, int(id_)) #(key of dictionary)

    new_img = Image.fromarray(new_img) 
    buffered = BytesIO()
    new_img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())

    return jsonify({'imageData':str(img_str.decode('utf-8'))})

# if __name__ == "__main__":
#     app.run(debug=True)
