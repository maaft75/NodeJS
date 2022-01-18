const Product = require('../models/product')

const getAllProducts = async (req, res) => {
	const { name, featured, sort, fields, page, limit, numericFilter } = req.query
	const queryObject = {}

	if(name){
		queryObject.name = {$regex:name, $options:'i'}
	}

	if(numericFilter){
		const options = ['price', 'rating']
		const operatorMap = {
			'>=':'$gte',
			'>':'$gt',
			'<=':'$lte',
			'<':'$lt',
			'=':'eq'
		}
		const regEx = /\b(>=|>|<=|<|=)\b/g 

		let filter = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`) //price-$gt-40000,rating-$gt-40000
		const filterArray = filter.split(',') // ['price-$gt-40000', 'rating-$gt-40000]
		filterArray.forEach((item) => {
			const [field, operator, value]= item.split('-')
			if(options.includes(field)){
				queryObject[field] = { [operator]: Number(value) }
			}
		});
	}

	if(featured){
		queryObject.featured = featured
	}

	let searchResult = Product.find(queryObject)

	if(sort){
		sortList = sort.split(',').join(' ')
		searchResult = searchResult.sort(sortList)
	}
	else{
		searchResult = searchResult.sort('createdAt')
	}

	if(fields){
		fieldsList = fields.split(',').join(' ')
		searchResult.select(fieldsList)
	}

	if(page && limit){
		const skip = Number((page - 1) * 5)
		searchResult.skip(skip).limit(limit)
	}

	if(searchResult.length < 1){
		return res.status(200).json({message: 'No search result matches this query parameter.'})
	} 

	const product = await searchResult
	console.log(queryObject)
	return res.status(200).json({data: product, numberOfHits: product.length})
}

module.exports = { getAllProducts }