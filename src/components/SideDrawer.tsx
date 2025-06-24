import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { InboxIcon, MailIcon } from 'lucide-react'

interface SideDrawerProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClickMenuItem: (item: string) => void
}
type Anchor = 'left' | 'right' | 'top' | 'bottom'

export const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  setOpen,
  onClickMenuItem,
}) => {
  const menuItems: { [key: string]: string }[][] = [
    [{ dashboard: 'Dashboard' }, { pokemon: 'Pokémons' }],
    [{ 'all-mail': 'All mail' }, { trash: 'Trash' }, { spam: 'Spam' }],
  ]

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
    key?: string,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setOpen(!open)
    if (key) onClickMenuItem(key)
  }

  const list = (
    anchor: Anchor,
    menu: Array<Array<{ [key: string]: string }>>,
  ) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      {menu.map((section, indexSection) => (
        <React.Fragment key={indexSection + 'section'}>
          <List>
            {section.map((item, index) => {
              const key = Object.keys(item)[0]
              return (
                <ListItem key={key} disablePadding>
                  <ListItemButton onClick={(e) => toggleDrawer(e, key)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item[key]} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
          {indexSection !== menu.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  )

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(!open)}
        anchor="left"
        className="w-100"
      >
        {list('left', menuItems)}
      </Drawer>
    </>
  )
}
