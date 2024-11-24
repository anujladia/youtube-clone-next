import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-screen">
      <div className="flex flex-center h-16 ml-4">
        <h1 className="text-3xl font-bold my-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          UTrimmer
        </h1>
      </div>
    
      <section className="md:flex w-full hidden h-[calc(100vh-4rem)]">
        <div className="w-1/5 md:w-2/5 h-100">
          <Sidebar />
        </div>
        <div className="w-4/5 md:w-3/5">
          {children}
        </div> 
      </section>

      <section className="sm:flex flex-col w-full md:hidden">
        <div className="w-full">
          {children}
        </div> 
        <div className="w-full">
          <Sidebar />
        </div>
        </section>
    </section>
  );
}
