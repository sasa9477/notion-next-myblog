export async function Header() {
  return (
    <div p={'y-8 x-4'} bg={'primary'} pos={'sticky'}>
      <header className={'max-w-5xl'} m={'auto'}>
        <h1 text={'4xl'} font='bold'>
          開発ログ
        </h1>
        <h2 m={'t-4'}>開発とか日常とかのログを残すブログ</h2>
      </header>
    </div>
  )
}
