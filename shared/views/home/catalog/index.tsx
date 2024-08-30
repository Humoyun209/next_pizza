'use client'

import React, { useEffect, useState } from 'react'
import ListOfProducts from './ListOfProducts'
import { productService } from '@/app/api/products/product.service'
import { useProductFilter } from '@/store/productFilters'
import useSWR from 'swr'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import toast from 'react-hot-toast'
import CatalogSkeleton from './CatalogSkeleton'

type Props = {}
type TCatalogProducts = Awaited<ReturnType<typeof productService.getProducts>>

const CatalogOfProducts = (props: Props) => {
    const { setLoading, isSubmitted, minPrice, maxPrice, ingredients, setIsSubmitted } =
        useProductFilter()
    const [productUrl, setProductUrl] = useState<string>(`${BASE_URL}/products`)

    useEffect(() => {
        setProductUrl(
            `${BASE_URL}/products?ingredients=${ingredients.join(
                '|',
            )}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        )
    }, [isSubmitted])

    const {
        data: categories,
        isLoading,
        error,
    } = useSWR<TCatalogProducts, Error>(productUrl, { fetcher, revalidateIfStale: false })

    useEffect(() => {
        setLoading(isLoading)
        return () => setIsSubmitted(false)
    }, [productUrl, isLoading])

    if (isLoading) {
        return <CatalogSkeleton />
    }

    if (error) {
        toast.error('Произошла ошибка при загрузке каталога')
        return <CatalogSkeleton />
    }

    return (
        <div className="col-span-8 flex flex-col">
            {categories?.map((cat, ind) => (
                <ListOfProducts key={cat.id} category={cat} className={ind > 0 ? 'mt-28' : ''} />
            ))}
        </div>
    )
}

export default CatalogOfProducts
