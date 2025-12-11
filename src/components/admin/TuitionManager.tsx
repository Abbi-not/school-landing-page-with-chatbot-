import { useState } from "react";
import { useSchoolData, TuitionItem } from "@/contexts/SchoolDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const TuitionManager = () => {
  const { data, updateTuition } = useSchoolData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TuitionItem | null>(null);
  const [form, setForm] = useState({ grade: "", tuitionFee: "", registrationFee: "", materialsFee: "" });

  const resetForm = () => {
    setForm({ grade: "", tuitionFee: "", registrationFee: "", materialsFee: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: TuitionItem) => {
    setEditingItem(item);
    setForm({
      grade: item.grade,
      tuitionFee: item.tuitionFee.toString(),
      registrationFee: item.registrationFee.toString(),
      materialsFee: item.materialsFee.toString(),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    updateTuition(data.tuition.filter(item => item.id !== id));
    toast.success("Tuition entry deleted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: TuitionItem = {
      id: editingItem?.id || Date.now().toString(),
      grade: form.grade,
      tuitionFee: Number(form.tuitionFee),
      registrationFee: Number(form.registrationFee),
      materialsFee: Number(form.materialsFee),
    };

    if (editingItem) {
      updateTuition(data.tuition.map(item => item.id === editingItem.id ? newItem : item));
      toast.success("Tuition entry updated");
    } else {
      updateTuition([...data.tuition, newItem]);
      toast.success("Tuition entry added");
    }

    setIsOpen(false);
    resetForm();
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-2xl">Manage Tuition & Fees</CardTitle>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Tuition Entry</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Grade Level</Label>
                <Input
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  placeholder="e.g., Kindergarten (KG)"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tuition Fee (ETB)</Label>
                <Input
                  type="number"
                  value={form.tuitionFee}
                  onChange={(e) => setForm({ ...form, tuitionFee: e.target.value })}
                  placeholder="e.g., 15000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Registration Fee (ETB)</Label>
                <Input
                  type="number"
                  value={form.registrationFee}
                  onChange={(e) => setForm({ ...form, registrationFee: e.target.value })}
                  placeholder="e.g., 2000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Materials Fee (ETB)</Label>
                <Input
                  type="number"
                  value={form.materialsFee}
                  onChange={(e) => setForm({ ...form, materialsFee: e.target.value })}
                  placeholder="e.g., 3000"
                  required
                />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"} Entry</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grade Level</TableHead>
              <TableHead>Tuition (ETB)</TableHead>
              <TableHead>Registration (ETB)</TableHead>
              <TableHead>Materials (ETB)</TableHead>
              <TableHead>Total (ETB)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.tuition.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.grade}</TableCell>
                <TableCell>{item.tuitionFee.toLocaleString()}</TableCell>
                <TableCell>{item.registrationFee.toLocaleString()}</TableCell>
                <TableCell>{item.materialsFee.toLocaleString()}</TableCell>
                <TableCell className="font-semibold">
                  {(item.tuitionFee + item.registrationFee + item.materialsFee).toLocaleString()}
                </TableCell>
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

export default TuitionManager;
