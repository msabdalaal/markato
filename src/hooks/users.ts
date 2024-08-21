import { useContext } from 'react'
import usePostEntity from './usePostEntity'
import { UserListContext } from '../providers/UserListContext'
import { User } from '../types'
import useDeleteEntity from './useDeleteEntity'
import useUpdateEntity from './useUpdateEntity'

export const useAddUser = () => {
  const { setUsersList } = useContext(UserListContext)
  return usePostEntity<User>('users', setUsersList)
}

export const useDeleteUser = () => {
  const { setUsersList } = useContext(UserListContext)
  return useDeleteEntity<User>('users', setUsersList)
}

export const useUpdateUser = () => {
  const { setUsersList } = useContext(UserListContext)
  return useUpdateEntity<User>('users', setUsersList)
}
