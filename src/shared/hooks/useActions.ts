import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import * as todoActions from '~/app/store/Slices/todos'

const rootActions = {
    ...todoActions.todosSlice.actions
}
export const useActions = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(rootActions,dispatch), [dispatch])
}