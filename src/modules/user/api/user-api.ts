import {rtkApi} from "@/shared/api";
import {Pagination, RequestParams} from "@/shared/types";
import {User} from "../model/types";

const userTag = 'user'

const PREFIX_URL = '/users';

export const userApi = rtkApi
    .enhanceEndpoints({addTagTypes: [userTag]})
    .injectEndpoints({
        endpoints: (builder) => ({
            getUsers: builder.query<Pagination<User>, RequestParams>({
                query: (params) => ({
                    url: PREFIX_URL,
                    params
                })
            })
        })
    })

export const useUsers = userApi.useGetUsersQuery;