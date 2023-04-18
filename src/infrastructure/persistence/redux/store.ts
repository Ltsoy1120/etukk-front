// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./store.d.ts" />


import { createReduxEnhancer } from "@sentry/react"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import combinedReducers from "./combinedReducers"


const sentryEnhancer = createReduxEnhancer()
const enhancer = compose(applyMiddleware(thunk), sentryEnhancer)
const store = createStore(combinedReducers, enhancer)


export default store
