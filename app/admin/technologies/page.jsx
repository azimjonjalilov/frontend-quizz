import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";

export default async function TechnologiesPage() {
  await dbConnect();
  const technologies = await Technology.find().sort({ order: 1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Technologies</h1>
          <p className="text-slate-500 mt-2">Manage the top-level categories (e.g. HTML, CSS, JavaScript).</p>
        </div>
        <Link href="/admin/technologies/new">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[100px]">Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technologies.map(tech => (
              <TableRow key={tech._id.toString()}>
                <TableCell>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: tech.color || '#f1f5f9' }}
                  >
                    {tech.icon && <img src={tech.icon.replace(/^\./, "")} alt="" className="w-6 h-6" />}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-slate-100">{tech.name}</TableCell>
                <TableCell>{tech.order}</TableCell>
                <TableCell>
                  {tech.isPublished ? (
                    <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">Published</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/technologies/${tech._id.toString()}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </Button>
                    </Link>
                    <DeleteButton id={tech._id.toString()} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {technologies.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No technologies found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
