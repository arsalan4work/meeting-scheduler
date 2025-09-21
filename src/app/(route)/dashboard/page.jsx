"use client"

import { Button } from '../../../components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

export default function dashboardPage() {
  return (
    <div>
      <div>dashboardPage</div>
      <LogoutLink><Button>Logout</Button></LogoutLink>
    </div>
  )
}
