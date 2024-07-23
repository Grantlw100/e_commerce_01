import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    DELETE_USER_ALERT,
    DELETE_USER_NOTIFICATION,
    DELETE_CONTENT
} from '../../../utils/mutations';
import {
    GET_USER_ALERTS,
    GET_USER_NOTIFICATIONS,
    GET_CONTENT
} from '../../../utils/queries';