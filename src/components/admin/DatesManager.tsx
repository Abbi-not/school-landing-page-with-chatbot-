import { useState } from "react";
import { useSchoolData, ImportantDate } from "@/contexts/SchoolDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const DatesManager = () => {
  const { data, updateDates } = useSchoolData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ImportantDate | null>(null);
  const [form, setForm] = useState({ title: "", date: "", description: "" });

  const resetForm = () => {
    setForm({ title: "", date: "", description: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: ImportantDate) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      date: item.date,
      description: item.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    updateDates(data.dates.filter(item => item.id !== id));
    toast.success("Date entry deleted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ImportantDate = {
      id: editingItem?.id || Date.now().toString(),
      ...form,
    };

    if (editingItem) {
      updateDates(data.dates.map(item => item.id === editingItem.id ? newItem : item));
      toast.success("Date entry updated");
    } else {
      updateDates([...data.dates, newItem]);
      toast.success("Date entry added");
    }

    setIsOpen(false);
    resetForm();
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-2xl">Manage Important Dates</CardTitle>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Date
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Important Date</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Registration Opens"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of this date"
                  required
                />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"} Date</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.dates.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {format(new Date(item.date), "MMM d, yyyy")}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DatesManager;
