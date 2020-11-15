# from google.cloud import vision
# from google.protobuf import field_mask_pb2 as field_mask

# def list_product_sets(project_id, location):
#     """List all product sets.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#     """
#     client = vision.ProductSearchClient()

#     # A resource that represents Google Cloud Platform location.
#     location_path = f"projects/{project_id}/locations/{location}"

#     # List all the product sets available in the region.
#     product_sets = client.list_product_sets(parent=location_path)

#     # Display the product set information.
#     for product_set in product_sets:
#         print('Product set name: {}'.format(product_set.name))
#         print('Product set id: {}'.format(product_set.name.split('/')[-1]))
#         print('Product set display name: {}'.format(product_set.display_name))
#         print('Product set index time: ')
#         print(product_set.index_time)

# def get_product_set(project_id, location, product_set_id):
#     """Get info about the product set.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#         product_set_id: Id of the product set.
#     """
#     client = vision.ProductSearchClient()

#     # Get the full path of the product set.
#     product_set_path = client.product_set_path(
#         project=project_id, location=location,
#         product_set=product_set_id)

#     # Get complete detail of the product set.
#     product_set = client.get_product_set(name=product_set_path)

#     # Display the product set information.
#     print('Product set name: {}'.format(product_set.name))
#     print('Product set id: {}'.format(product_set.name.split('/')[-1]))
#     print('Product set display name: {}'.format(product_set.display_name))
#     print('Product set index time: ')
#     print(product_set.index_time)

# def list_reference_images(
#         project_id, location, product_id):
#     """List all images in a product.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#         product_id: Id of the product.
#     """
#     client = vision.ProductSearchClient()

#     # Get the full path of the product.
#     product_path = client.product_path(
#         project=project_id, location=location, product=product_id)

#     # List all the reference images available in the product.
#     reference_images = client.list_reference_images(parent=product_path)

#     # Display the reference image information.
#     for image in reference_images:
#         print('Reference image name: {}'.format(image.name))
#         print('Reference image id: {}'.format(image.name.split('/')[-1]))
#         print('Reference image uri: {}'.format(image.uri))
#         print('Reference image bounding polygons: {}'.format(
#             image.bounding_polys))

# def list_products(project_id, location):
#     """List all products.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#     """
#     client = vision.ProductSearchClient()

#     # A resource that represents Google Cloud Platform location.
#     location_path = f"projects/{project_id}/locations/{location}"

#     # List all the products available in the region.
#     products = client.list_products(parent=location_path)

#     # Display the product information.
#     for product in products:
#         print('Product name: {}'.format(product.name))
#         print('Product id: {}'.format(product.name.split('/')[-1]))
#         print('Product display name: {}'.format(product.display_name))
#         print('Product description: {}'.format(product.description))
#         print('Product category: {}'.format(product.product_category))
#         print('Product labels: {}\n'.format(product.product_labels))


# def get_reference_image(
#         project_id, location, product_id, reference_image_id):
#     """Get info about a reference image.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#         product_id: Id of the product.
#         reference_image_id: Id of the reference image.
#     """
#     client = vision.ProductSearchClient()

#     # Get the full path of the reference image.
#     reference_image_path = client.reference_image_path(
#         project=project_id, location=location, product=product_id,
#         reference_image=reference_image_id)

#     # Get complete detail of the reference image.
#     image = client.get_reference_image(name=reference_image_path)

#     # Display the reference image information.
#     print('Reference image name: {}'.format(image.name))
#     print('Reference image id: {}'.format(image.name.split('/')[-1]))
#     print('Reference image uri: {}'.format(image.uri))
#     print('Reference image bounding polygons: {}'.format(image.bounding_polys))
#     return image


# def get_similar_products_file(
#         project_id, location, product_set_id, product_category,
#         file_path, filter):
#     """Search similar products to image.
#     Args:
#         project_id: Id of the project.
#         location: A compute region name.
#         product_set_id: Id of the product set.
#         product_category: Category of the product.
#         file_path: Local file path of the image to be searched.
#         filter: Condition to be applied on the labels.
#         Example for filter: (color = red OR color = blue) AND style = kids
#         It will search on all products with the following labels:
#         color:red AND style:kids
#         color:blue AND style:kids
#     """
#     # product_search_client is needed only for its helper methods.
#     product_search_client = vision.ProductSearchClient()
#     image_annotator_client = vision.ImageAnnotatorClient()

#     # Read the image as a stream of bytes.
#     with open(file_path, 'rb') as image_file:
#         content = image_file.read()

#     # Create annotate image request along with product search feature.
#     image = vision.Image(content=content)

#     # product search specific parameters
#     product_set_path = product_search_client.product_set_path(
#         project=project_id, location=location,
#         product_set=product_set_id)
#     product_search_params = vision.ProductSearchParams(
#         product_set=product_set_path,
#         product_categories=[product_category],
#         filter=filter)
#     image_context = vision.ImageContext(
#         product_search_params=product_search_params)

#     # Search products similar to the image.
#     response = image_annotator_client.product_search(
#         image, image_context=image_context)

#     index_time = response.product_search_results.index_time
#     print('Product set index time: ')
#     print(index_time)

#     results = response.product_search_results.results

#     jsonible = []

#     # print('Search results:')
#     for result in results:
#         product = result.product
#         info_dict = {}
#         info_dict['score'] = str(result.score)
#         info_dict['imageName'] = str(result.image)
#         print(result)
#         info_dict['productName'] = str(product.name)
#         info_dict['productDisplayName'] = str(product.display_name)
#         info_dict['productDescription'] = str(product.description)
#         product_labels_dict = {}

#         for key_value in str(product.product_labels).split(','):
#             key_values = key_value.replace('"','').replace('[','').replace(']','').replace('\n',',').split(',')
#             keys = key_values[0]
#             values = key_values[1]
#             key = keys.split(':')[1].strip()
#             product_labels_dict[key] = values.split(':')[1].strip()
            
#         info_dict['productLabels'] = product_labels_dict

#         jsonible.append(info_dict)
#         # print('Score(Confidence): {}'.format(result.score))
#         # print('Image name: {}'.format(result.image))

#         # print('Product name: {}'.format(product.name))
#         # print('Product display name: {}'.format(
#         #     product.display_name))
#         # print('Product description: {}\n'.format(product.description))
#         # print('Product labels: {}\n'.format(product.product_labels))
#     return jsonible