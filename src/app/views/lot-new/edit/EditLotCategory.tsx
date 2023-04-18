import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Picker from "app/components/UI/Picker/Picker"
import {getCategory} from "infrastructure/persistence/api/data/actions"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import {lotDraftStorage} from "."

function EditLotCategory() {
  const params = useParams()
  console.log("params", params)

  const [tempCategoryId, setTempCategoryId] = useState<
    number | null | undefined
  >(null)
  console.log("tempCategoryId", tempCategoryId)
  const [categoryId, setCategoryId] = lotDraftStorage.state<
    number | null | undefined
  >("category")
  console.log("categoryId", categoryId)

  async function updateCategory(value: number | null, payload: CategoryItem[]) {
    if (value == null) return

    const hasChildren =
      payload.find(item => item.parent_category_id === value) != null

    if (!hasChildren) {
      setCategoryId(value)
    } else {
      setTempCategoryId(value)
    }
  }
  useEffect(() => {
    setCategoryId(null)
  }, [tempCategoryId])

  return (
    <section>
      <QueryContainer action={getCategory()}>
        {payload => {
          const {category, parentItem, options} = breakDownCategories(
            payload,
            categoryId || tempCategoryId
          )
          // console.log("category", category)
          console.log("parentItem", parentItem)
          // console.log("options", options)
          return (
            <>
              <h4>Выберите {category.item ? "под" : ""}категорию</h4>
              <Picker
                defaultValue={categoryId}
                onChange={value => updateCategory(value, payload)}>
                {options?.map(category => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Picker>
              <br />
              <br />
              {!!category.item && (
                <Button
                  onClick={() =>
                    setTempCategoryId(parentItem?.parent_category_id)
                  }>
                  Вернуться к пред. категории
                </Button>
              )}
            </>
          )
        }}
      </QueryContainer>
    </section>
  )
}

interface CategoryItem {
  id: number
  name: string
  parent_category_id?: number | null | undefined
}

export function breakDownCategories(
  categories: CategoryItem[],
  categoryId: number | string | null | undefined
) {
  // console.log("category", categoryId)

  const category = Number(categoryId)

  const categoryItem = categories.find(item => item.id === (category || null))
  const categoryChildren = categories.filter(
    item => item.parent_category_id === (category || null)
  )

  const options =
    categoryChildren.length > 0
      ? categoryChildren
      : categories.filter(
          item => item.parent_category_id === categoryItem?.parent_category_id
        )

  const parentItem =
    categoryChildren.length > 0
      ? categoryItem
      : categories.find(item => item.id === categoryItem?.parent_category_id)

  return {
    category: {item: categoryItem, children: categoryChildren},
    parentItem,
    options,
  }
}

export default EditLotCategory
