/**
 * Laptop repair: "No bootable device" (pages/common/IctLabLaptopRepair.vue) - the whole job a
 * technician does: find out why the laptop will not start, gather the right tools, open it and
 * replace the failed SSD, make a Windows installer USB, and install Windows. This file is the
 * content: the clues, the causes, the tools, the steps and the questions.
 */

export type Stage = 'diagnose' | 'tools' | 'repair' | 'usb' | 'install' | 'check'

export const STAGES: { key: Stage; label: string; hint: string }[] = [
  { key: 'diagnose', label: 'Find the cause', hint: 'why no bootable device?' },
  { key: 'tools', label: 'Toolkit', hint: 'the right tools and part' },
  { key: 'repair', label: 'Open and repair', hint: 'replace the SSD in 3D' },
  { key: 'usb', label: 'Installer USB', hint: 'make it on another PC' },
  { key: 'install', label: 'Install Windows', hint: 'setup, step by step' },
  { key: 'check', label: 'Check', hint: '6 questions' }
]

// ------------------------------------------------------------------ 1. diagnose

/** The checks a technician makes, and what each one shows on this laptop */
export interface Check {
  key: string
  label: string
  how: string
  shows: string
  /** What it tells you */
  means: string
  /** Shown on the laptop screen while this check is open */
  screen?: 'error' | 'bios-main' | 'bios-boot' | 'history'
}

export const CHECKS: Check[] = [
  { key: 'read', label: 'Read the screen', how: 'Switch it on and read the message.', screen: 'error', shows: '"No Bootable Device - insert boot disk and press any key".', means: 'The computer itself works: the screen, the processor and the BIOS are running. It just cannot find anything to start the operating system from.' },
  { key: 'bios', label: 'Look in the BIOS', how: 'Restart and press F2 to open the BIOS, then look at the Main page.', screen: 'bios-main', shows: 'Storage: "SSD: None". The BIOS cannot see any drive at all.', means: 'If the drive were there and working, the BIOS would list it by name. "None" points to the drive itself - failed, or not connected.' },
  { key: 'order', label: 'Check the boot order', how: 'In the BIOS, open the Boot page.', screen: 'bios-boot', shows: 'Boot priority: Windows Boot Manager is missing; only "USB HDD" and "Network" are listed.', means: 'The boot order is not the problem - there is simply no drive with Windows on it to put first.' },
  { key: 'history', label: 'Ask what happened', how: 'Ask the owner what happened before it stopped working.', screen: 'history', shows: '"It fell off the desk on Friday. On Monday it showed this message."', means: 'A knock can loosen a drive in its slot, or damage it. Drives also simply wear out.' }
]

export interface Cause {
  key: string
  text: string
  right: boolean
  why: string
}

/** What could be wrong - the student picks the most likely */
export const CAUSES: Cause[] = [
  { key: 'drive', text: 'The SSD has failed or come loose - the BIOS cannot see it', right: true, why: 'Yes. The BIOS shows "SSD: None", so the computer cannot see the drive at all. The fix: open it, reseat the drive; if it is still not seen, replace it and install Windows on the new drive.' },
  { key: 'windows', text: 'Windows is damaged (corrupted)', right: false, why: 'Then the BIOS would still list the SSD by name - the drive would be there, only the files on it broken. That is fixed with Startup Repair or by reinstalling Windows, not by opening the laptop.' },
  { key: 'order', text: 'The boot order is wrong', right: false, why: 'A wrong boot order still lists the drive - it is just not first. Here there is no drive in the list at all.' },
  { key: 'screen', text: 'The screen is broken', right: false, why: 'The screen shows the message clearly, so it works. The problem is what is (not) behind it.' },
  { key: 'ram', text: 'The memory (RAM) is faulty', right: false, why: 'Faulty RAM usually stops the computer earlier: beeps, a black screen or crashes. This laptop gets through POST and into the BIOS.' }
]

/** Every reason a laptop says "No bootable device", and the fix - shown after the diagnosis */
export const ALL_CAUSES: { when: string; cause: string; fix: string }[] = [
  { when: 'The BIOS does not list the drive', cause: 'The drive has failed, or is loose / disconnected', fix: 'Open the laptop: reseat the drive. Still not seen? Replace it, then install Windows.' },
  { when: 'The drive is listed, but not first', cause: 'Wrong boot order (often after a USB was left in)', fix: 'BIOS > Boot: put Windows Boot Manager first. Save and exit (F10).' },
  { when: 'The drive is listed and first', cause: 'Windows\' start-up files are damaged', fix: 'Boot from a Windows USB and choose Repair your computer > Startup Repair, or reinstall Windows.' },
  { when: 'A new, empty drive', cause: 'No operating system installed yet', fix: 'Install Windows from a USB installer.' },
  { when: 'After changing BIOS settings', cause: 'UEFI / Legacy (CSM) mode switched', fix: 'Set the boot mode back to UEFI (how Windows was installed).' }
]

// ------------------------------------------------------------------ 2. toolkit

export interface Tool {
  key: string
  name: string
  icon: string
  need: boolean
  why: string
}

export const TOOLS: Tool[] = [
  { key: 'phillips', name: 'Precision Phillips screwdriver (#0)', icon: '🪛', need: true, why: 'Laptop screws are tiny Phillips (cross) screws - a #0 fits them without stripping the heads.' },
  { key: 'spudger', name: 'Plastic pry tool (spudger)', icon: '🔺', need: true, why: 'Opens the bottom panel\'s clips without scratching the case or shorting anything.' },
  { key: 'strap', name: 'Anti-static wrist strap', icon: '⌚', need: true, why: 'Static from your body can kill the parts inside. The strap sends it safely away.' },
  { key: 'tray', name: 'Magnetic screw tray', icon: '🧲', need: true, why: 'Keeps the tiny screws together - and in order, because some are different lengths.' },
  { key: 'ssd', name: 'New SSD (the right kind)', icon: '💾', need: true, why: 'The replacement drive - it must match the laptop\'s slot. You choose which one next.' },
  { key: 'usb', name: 'USB flash drive, 8 GB or more', icon: '🔌', need: true, why: 'Becomes the Windows installer. Everything on it will be erased.' },
  { key: 'pc', name: 'Another working computer with internet', icon: '💻', need: true, why: 'The broken laptop cannot download anything - you make the installer USB on another PC.' },
  { key: 'air', name: 'Compressed air', icon: '💨', need: true, why: 'While it is open, blow the dust out of the fan - a good technician always does.' },
  { key: 'flat', name: 'Big flat-head screwdriver', icon: '🔧', need: false, why: 'Too big: it slips, strips the tiny cross-head screws and scratches the board.' },
  { key: 'knife', name: 'Kitchen knife', icon: '🔪', need: false, why: 'Never pry with metal: it scratches the case, can cut cables and short the battery. Use the plastic tool.' },
  { key: 'hammer', name: 'Hammer', icon: '🔨', need: false, why: 'Nothing in a laptop needs force. If a part will not move, find the screw you missed.' },
  { key: 'cloth', name: 'Wet cloth', icon: '🧽', need: false, why: 'Water and electronics do not mix. Use compressed air or a dry anti-static brush.' }
]

export interface SsdChoice {
  key: string
  name: string
  detail: string
  right: boolean
  why: string
}

export const SSD_CHOICES: SsdChoice[] = [
  { key: 'm2nvme', name: 'M.2 2280 NVMe SSD, 512 GB', detail: '22 mm wide, 80 mm long, PCIe NVMe, M key', right: true, why: 'Matches the sticker exactly: an M.2 slot for a 2280 (80 mm) NVMe drive.' },
  { key: 'sata25', name: '2.5-inch SATA SSD, 512 GB', detail: '2.5-inch box, SATA connector', right: false, why: 'This laptop has no 2.5-inch bay or SATA cable - only an M.2 slot.' },
  { key: 'm2short', name: 'M.2 2242 SSD, 256 GB', detail: '22 mm wide, 42 mm long', right: false, why: 'Too short: the screw post is at 80 mm for a 2280 drive, so a 42 mm drive cannot be held down.' },
  { key: 'hdd', name: '1 TB hard disk (HDD)', detail: '2.5-inch, spinning disks', right: false, why: 'No bay for it, and an HDD is much slower than the SSD the laptop came with.' }
]

/** The laptop's sticker underneath (the clue for the right SSD) */
export const STICKER = ['Model: TUSOME BOOK 14', 'Storage: M.2 2280 PCIe NVMe', 'Memory: 8 GB DDR4 SO-DIMM', 'Battery: 3-cell Li-ion 45 Wh', 'Input: 19V 2.37A']

// ------------------------------------------------------------------ 3. open and repair (3D)

export interface RepairStep {
  key: string
  title: string
  text: string
  /** What to tap in the 3D scene ("screw:3" = any screw counts toward this step) */
  target: string
  hint: string
  why?: string
}

export const REPAIR_STEPS: RepairStep[] = [
  { key: 'charger', target: 'charger', title: 'Shut down and unplug the charger', text: 'The laptop is off. Pull the charger out of the laptop.', hint: 'Tap the charger plug on the left side of the laptop.', why: 'Never work inside a computer that is plugged in.' },
  { key: 'strap', target: 'strap', title: 'Put on the anti-static strap', text: 'Clip the wrist strap to the bare metal of the mat.', hint: 'Tap the green wrist strap on the mat.', why: 'Static from your body can damage the SSD and the motherboard.' },
  { key: 'screws', target: 'screw', title: 'Undo the bottom screws', text: 'The laptop is upside down. Undo every screw on the bottom panel - put each in the tray.', hint: 'Tap each silver screw (and look under the rubber feet - one screw hides there).', why: 'Keep them in order: the screws near the hinges are longer.' },
  { key: 'foot', target: 'foot', title: 'Find the hidden screw', text: 'The panel still will not come off. Technicians know: one screw often hides under a rubber foot.', hint: 'Tap the rubber foot at the front right corner, then the screw under it.' },
  { key: 'pry', target: 'seam', title: 'Pry the panel open', text: 'Slide the plastic pry tool into the gap at a back corner and run it round to release the clips.', hint: 'Tap the gap at the back edge of the panel (near the hinges).', why: 'Start at the hinges, where the gap is widest. Never use metal.' },
  { key: 'battery', target: 'battery-plug', title: 'Disconnect the battery first', text: 'Before touching anything else, unplug the battery\'s connector from the motherboard.', hint: 'Tap the white battery connector where the battery cable meets the board.', why: 'The battery still powers the board even when the laptop is off - working with it connected can short and destroy parts.' },
  { key: 'ssd-screw', target: 'ssd-screw', title: 'Undo the SSD screw', text: 'Now find the SSD: the small green stick in the M.2 slot. One small screw holds it down at its end.', hint: 'Tap the tiny screw at the far end of the SSD.' },
  { key: 'ssd-out', target: 'old-ssd', title: 'Take out the old SSD and look at it', text: 'It springs up to an angle - slide it out of the slot and look at it closely.', hint: 'Tap the old SSD (the small green stick with a label).', why: 'One chip is burnt black - the drive has failed. (If it had only come loose, pushing it back in - reseating - would have fixed it. Always try that free fix first.)' },
  { key: 'ssd-in', target: 'new-ssd', title: 'Fit the new SSD', text: 'Slide the new SSD into the M.2 slot at an angle (about 30°), gold contacts first, then press the end down.', hint: 'Tap the new SSD on the mat.', why: 'The notch in the contacts only lets it go in one way round - never force it.' },
  { key: 'ssd-fix', target: 'ssd-screw', title: 'Screw the new SSD down', text: 'Hold it down and put the small screw back.', hint: 'Tap the screw post at the end of the new SSD.' },
  { key: 'fan', target: 'fan', title: 'Clean the fan while it is open', text: 'Blow the dust out of the fan with compressed air - hold the fan still.', hint: 'Tap the round fan.' },
  { key: 'reconnect', target: 'battery-plug', title: 'Reconnect the battery', text: 'Plug the battery connector back in, straight and all the way.', hint: 'Tap the battery connector.' },
  { key: 'close', target: 'panel', title: 'Put the panel back', text: 'Line the panel up, press round the edges until it clicks, and put every screw back - the long ones at the hinges.', hint: 'Tap the bottom panel lying beside the laptop.' },
  { key: 'test', target: 'power', title: 'Test it', text: 'Turn it over, plug in the charger and switch on. Open the BIOS - is the new SSD there?', hint: 'Tap the power button.', why: 'The BIOS now shows "SSD: 512 GB NVMe" - the laptop sees the new drive. It is empty, so next: install Windows.' }
]

/** Things a student may tap too early, and why not */
export const REPAIR_WRONG: Record<string, string> = {
  'old-ssd': 'Not yet - disconnect the battery before touching any part inside.',
  'ssd-screw': 'Disconnect the battery first.',
  'new-ssd': 'Take the old SSD out first.',
  fan: 'Do that once the new SSD is in.',
  panel: 'The panel goes back last.',
  power: 'Not until the laptop is closed and the battery reconnected.',
  'battery-plug': 'Open the panel first.',
  seam: 'Take out all the screws first - prying against a screw cracks the panel.',
  screw: 'Unplug the charger and put the strap on first.',
  foot: 'Undo the screws you can see first.'
}

// ------------------------------------------------------------------ 4 & 5. screens

/** One screen of a guided flow (making the USB, installing Windows) */
export interface FlowScreen {
  key: string
  title: string
  /** What the student should do here */
  task: string
  /** Shown once done: why */
  learn: string
  /** The screen to draw (WindowsScreen.vue) */
  view: string
  /** The choices on the screen; the right one is `right` */
  choices?: { label: string; right?: boolean; why?: string }[]
  /** A progress screen that runs by itself */
  auto?: number
}

export const USB_FLOW: FlowScreen[] = [
  { key: 'site', view: 'browser', title: 'Download the tool', task: 'On the working PC, open the browser and get Microsoft\'s Media Creation Tool. Which website?', learn: 'Only download Windows from microsoft.com. Fake "free Windows" sites hide viruses in the download.',
    choices: [{ label: 'microsoft.com/software-download/windows11', right: true }, { label: 'free-windows11-crack.xyz', why: 'A "crack" site - it will infect the USB, and then the laptop, with malware.' }, { label: 'windows-iso-fast-download.net', why: 'Not Microsoft. Never trust a copy of Windows from a site like this.' }] },
  { key: 'license', view: 'mct-license', title: 'Run the Media Creation Tool', task: 'The tool opens with the licence terms.', learn: 'You must accept the licence to use the tool.', choices: [{ label: 'Accept', right: true }, { label: 'Decline', why: 'Declining closes the tool - you cannot make the installer.' }] },
  { key: 'what', view: 'mct-what', title: 'What do you want to do?', task: 'You are making an installer for ANOTHER computer.', learn: '"Upgrade this PC" would change the working PC. You want installation media for the broken laptop.', choices: [{ label: 'Create installation media (USB flash drive, DVD, or ISO file) for another PC', right: true }, { label: 'Upgrade this PC now', why: 'That changes the computer you are using - not what you want.' }] },
  { key: 'lang', view: 'mct-lang', title: 'Language, edition and architecture', task: 'Choose English, Windows 11, 64-bit.', learn: 'Windows 11 is 64-bit only. Pick the language the user wants.', choices: [{ label: 'English (United Kingdom) · Windows 11 · 64-bit (x64)', right: true }, { label: '32-bit (x86)', why: 'Windows 11 has no 32-bit version, and modern laptops are 64-bit.' }] },
  { key: 'media', view: 'mct-media', title: 'Which media?', task: 'You plugged the USB flash drive into this PC.', learn: 'A USB flash drive is the easiest: the laptop boots from it directly.', choices: [{ label: 'USB flash drive', right: true }, { label: 'ISO file', why: 'An ISO is a file you would still have to put onto a USB with another program.' }] },
  { key: 'drive', view: 'mct-drive', title: 'Select the USB flash drive', task: 'Choose the 8 GB flash drive. Careful - it will be erased.', learn: 'Check twice before choosing: everything on the chosen drive is wiped.', choices: [{ label: 'E: SANDISK (8 GB)', right: true }, { label: 'D: BACKUP (1 TB)', why: 'That is the backup hard disk - choosing it would erase all the backups!' }] },
  { key: 'make', view: 'mct-progress', title: 'Creating the installer', task: 'The tool downloads Windows and puts it on the USB.', learn: 'This takes time - Windows is several gigabytes. Do not remove the USB.', auto: 4500 },
  { key: 'ready', view: 'mct-ready', title: 'Your USB flash drive is ready', task: 'Safely eject the USB and take it to the laptop.', learn: 'You now have a bootable Windows installer.', choices: [{ label: 'Finish', right: true }] }
]

export const INSTALL_FLOW: FlowScreen[] = [
  { key: 'plug', view: 'laptop-off', title: 'Plug in the USB and switch on', task: 'Put the installer USB in the laptop and press the power button - then press F12 straight away for the boot menu.', learn: 'F12 (on many laptops, or F9 / Esc) opens a one-time boot menu - you choose the USB just for this start.', choices: [{ label: 'Power on and press F12', right: true }, { label: 'Power on and wait', why: 'It will look for an operating system on the empty SSD and show "No bootable device" again.' }] },
  { key: 'bootmenu', view: 'boot-menu', title: 'Choose the boot device', task: 'Pick the USB flash drive.', learn: 'UEFI means the modern way of booting - Windows 11 needs it.', choices: [{ label: 'UEFI: SanDisk USB 8GB', right: true }, { label: 'NVMe SSD 512GB', why: 'The new SSD is empty - there is nothing on it to start yet.' }, { label: 'Network boot (PXE)', why: 'That starts from a school server - not what you want here.' }] },
  { key: 'language', view: 'setup-language', title: 'Windows Setup', task: 'Choose the language, time and keyboard, then Next.', learn: 'Setup is now running from the USB.', choices: [{ label: 'English (United Kingdom) · Uganda time · US keyboard → Next', right: true }] },
  { key: 'installnow', view: 'setup-install', title: 'Install now', task: 'Start the installation.', learn: '"Repair your computer" is for fixing an existing Windows - this drive has none.', choices: [{ label: 'Install now', right: true }, { label: 'Repair your computer', why: 'There is no Windows on the new SSD to repair.' }] },
  { key: 'key', view: 'setup-key', title: 'Activate Windows', task: 'The laptop came with Windows - its licence is saved in the laptop itself.', learn: 'A laptop that came with Windows activates by itself after installing (a digital licence stored in the BIOS). You do not need to type a key.', choices: [{ label: 'I don\'t have a product key', right: true }, { label: 'Type a key from a website', why: 'Keys from websites are often stolen or fake - and this laptop does not need one.' }] },
  { key: 'edition', view: 'setup-edition', title: 'Choose the edition', task: 'The laptop came with Windows 11 Home - choose the same edition.', learn: 'Install the edition the laptop was sold with, so its licence activates it.', choices: [{ label: 'Windows 11 Home', right: true }, { label: 'Windows 11 Pro', why: 'The laptop\'s licence is for Home - Pro would not activate.' }] },
  { key: 'terms', view: 'setup-terms', title: 'Licence terms', task: 'Accept the licence terms.', learn: 'You must accept them to install.', choices: [{ label: 'Accept', right: true }] },
  { key: 'type', view: 'setup-type', title: 'Which type of installation?', task: 'This is a new, empty drive.', learn: 'Upgrade keeps an old Windows - there is none. Custom installs Windows fresh on the drive you choose.', choices: [{ label: 'Custom: Install Windows only (advanced)', right: true }, { label: 'Upgrade: Install Windows and keep files, settings and apps', why: 'There is no old Windows on the new SSD to upgrade.' }] },
  { key: 'where', view: 'setup-where', title: 'Where do you want to install Windows?', task: 'Choose the new SSD.', learn: '"Unallocated space" means the new drive is empty - not divided into partitions yet. Choose it and press Next; Windows makes the partitions it needs by itself.', choices: [{ label: 'Drive 0 Unallocated Space - 476.9 GB → Next', right: true }, { label: 'Drive 1 Partition 1: SANDISK (USB) - 7.5 GB', why: 'That is the installer USB itself - you would destroy it.' }] },
  { key: 'installing', view: 'setup-progress', title: 'Installing Windows', task: 'Copying files, getting files ready, installing features and updates. The laptop restarts by itself.', learn: 'Do not switch off while it installs. It restarts a few times.', auto: 6000 },
  { key: 'restart', view: 'setup-restart', title: 'It restarts', task: 'When it restarts, it should start from the SSD now - not the USB.', learn: 'If it starts from the USB again, Setup begins all over. Take the USB out once the first restart begins (or let it start from the SSD).', choices: [{ label: 'Remove the USB and let it start from the SSD', right: true }, { label: 'Leave the USB in and press F12 → USB again', why: 'That starts Setup again from the beginning.' }] },
  { key: 'oobe', view: 'oobe', title: 'First-time setup', task: 'Country: Uganda · keyboard: US · connect to Wi-Fi · name the device and sign in.', learn: 'This is the "out-of-box experience" - the same screens a new laptop shows.', choices: [{ label: 'Uganda · US keyboard · connect to Wi-Fi · create the account', right: true }] },
  { key: 'updates', view: 'settings-update', title: 'Updates and drivers', task: 'On the desktop, open Settings > Windows Update and install everything.', learn: 'Updates bring security fixes and the drivers that make the Wi-Fi, sound and graphics work properly. Then check Device Manager has no yellow warnings.', choices: [{ label: 'Check for updates and install all', right: true }, { label: 'Skip updates', why: 'Without updates, drivers may be missing and the laptop is not protected.' }] },
  { key: 'done', view: 'desktop', title: 'Done - hand it back', task: 'Windows is installed, activated and up to date.', learn: 'Settings > System > Activation says: "Windows is activated with a digital licence". The job is complete.', choices: [{ label: 'Hand the laptop back', right: true }] }
]

// ------------------------------------------------------------------ 6. check

export const CHECK = [
  { q: 'A laptop says "No bootable device" and the BIOS shows "SSD: None". What is most likely?', options: ['The SSD has failed or is loose', 'Windows is corrupted', 'The screen is broken', 'The keyboard is faulty'], a: 'The SSD has failed or is loose', why: 'If the BIOS cannot see the drive, the problem is the drive or its connection.' },
  { q: 'What do you disconnect first after opening a laptop?', options: ['The battery connector', 'The SSD', 'The fan', 'The screen cable'], a: 'The battery connector', why: 'The battery powers the board even when the laptop is off.' },
  { q: 'What do you open a laptop\'s bottom panel with?', options: ['A plastic pry tool', 'A kitchen knife', 'A big flat screwdriver', 'Your fingernails and force'], a: 'A plastic pry tool', why: 'Plastic will not scratch, cut or short anything.' },
  { q: 'Where do you make the Windows installer USB?', options: ['On another working computer, with Microsoft\'s Media Creation Tool', 'On the broken laptop', 'From any website offering free Windows', 'You cannot - you must buy a DVD'], a: 'On another working computer, with Microsoft\'s Media Creation Tool', why: 'The broken laptop cannot download anything, and only microsoft.com is safe.' },
  { q: 'In Windows Setup the new SSD shows "Unallocated space". What does that mean?', options: ['The drive is empty and not divided into partitions yet', 'The drive is broken', 'Windows is already installed', 'The USB is full'], a: 'The drive is empty and not divided into partitions yet', why: 'Choose it and press Next - Setup makes the partitions.' },
  { q: 'Why is there no need to type a product key on this laptop?', options: ['It came with Windows - its digital licence activates it again', 'Windows is free for everyone', 'Keys are only for desktops', 'You can type any key from a website'], a: 'It came with Windows - its digital licence activates it again', why: 'Install the same edition and it activates by itself once online.' }
]
