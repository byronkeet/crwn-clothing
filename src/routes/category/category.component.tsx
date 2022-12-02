import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

import { Title, CategoryContainer } from './category.styles';

type CategoryRouteParams = {
	category: string
}

const Category = () => {
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
	console.log('render/re-rendering category component');
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		console.log('effect fired calling setProducts')
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			<Title>{category.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products && products.map((product) => <ProductCard key={product.id} product={product} />)}
				</CategoryContainer>
			)}
		
		</Fragment>
	)
}

export default Category;